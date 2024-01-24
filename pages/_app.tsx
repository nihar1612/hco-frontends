import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module';
import '../styles/globals.css';
import Cookies from 'js-cookie';
import { getCurrentExperiment } from 'lib/experiments';

function cleanRouterPath(routerPath: string) {
  const _pathSliceLength = Math.min.apply(Math, [
    routerPath.indexOf('?') > 0 ? routerPath.indexOf('?') : routerPath.length,
    routerPath.indexOf('#') > 0 ? routerPath.indexOf('#') : routerPath.length,
  ]);
  return routerPath.substring(0, _pathSliceLength);
}

function reportExperiment() {
  const experiment = getCurrentExperiment(window.location.pathname);
  if (experiment) {
    ga('set', 'exp', Cookies.get(experiment.cookie));
    ga('send', 'pageview');
  }
}

export default function DawnWeb({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    TagManager.initialize({ gtmId: 'GTM-5PZLLVM' });
    // The following is from https://developers.google.com/optimize/devguides/experiments?technology=analyticsjs
    (function (i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      (i[r] =
        i[r] ||
        function () {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
    ga('create', 'UA-199206868-1', 'auto');
    reportExperiment();
  }, []);

  useEffect(() => {
    console.log('router useeffect');
    router.events.on('routeChangeComplete', reportExperiment);

    return () => {
      router.events.off('routeChangeComplete', reportExperiment);
    };
  }, [router.events]);

  useEffect(() => {
    (function (w, d, t) {
		  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
		
		  ttq.load('CDCJRU3C77U6290RJ1D0');
		  ttq.page();
		})(window, document, 'ttq');
  }, []);

  let canonicalUrl = 'https://www.dawn.health';
  const routerPath = cleanRouterPath(router.asPath);
  if (routerPath !== '/') {
    canonicalUrl = canonicalUrl + routerPath;
  }
  return (
    <>
      <Head>
        <title>Dawn Health</title>
        <link rel="canonical" href={canonicalUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <script async src="https://www.googleoptimize.com/optimize.js?id=OPT-PRXKZ7Z" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
