import { groq } from 'next-sanity';

export const pageQuery = groq`
*[(_type == 'page' || _type == 'adPage') && slug.current == $slug][0]{
  ..., sections[] {..., internalLinkCallToAction->, teamMember->, portableText[] { ..., _type == "internalLinkExtended" => { "contentType": @->_type, "title": @->title, "slug": @->slug.current, "mainImage": @->mainImage, "excerpt": @->excerpt, "introSection": @->sections[0] }, markDefs[] { ...,  _type == "internalLink" => { "contentType": @.reference->_type,  "slug": @.reference->slug.current, "title": @.reference->title, "excerpt": @.reference->excerpt  } } } }
  }`;
export const pagePathsQuery = groq`*[(_type == 'page' || _type == 'adPage') && defined(slug) && publishedAt < now()]{ slug }`;
