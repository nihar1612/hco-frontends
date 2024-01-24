import { Variant, getCurrentExperiment } from 'lib/experiments';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/questionnaire'],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const matchingExperiment = getCurrentExperiment(url.pathname);

  if (!matchingExperiment) {
    return null;
  }

  let cookie = req.cookies.get(matchingExperiment.cookie);

  if (!cookie || cookie.indexOf(matchingExperiment.id) === -1) {
    let variant = getBucket(matchingExperiment.variants);
    cookie = `${matchingExperiment.id}.${variant.id}`;
  }

  const variant = cookie.split('.')[1];

  let res;
  if (matchingExperiment.urlBased) {
    url.pathname = `${url.pathname}/${matchingExperiment.variants.find((x) => x.id.toString() === variant).name}`;
    res = NextResponse.redirect(url);
  } else {
    if (variant != '0') {
      url.pathname = url.pathname.replace('/', `/experimental/${variant}/`);
    }
    res = NextResponse.rewrite(url);
  }

  // Add the cookie if it's not there
  if (
    !req.cookies.get(matchingExperiment.cookie) ||
    req.cookies.get(matchingExperiment.cookie).indexOf(matchingExperiment.id) === -1
  ) {
    res.cookies.set(matchingExperiment.cookie, cookie);
  }

  return res;
}

function getBucket(variants: readonly Variant[]) {
  let n = Math.random() * 100;
  const variant = variants.find((v) => {
    if (v.weight >= n) {
      return true;
    }
    n -= v.weight;
    return false;
  });

  return variant;
}
