import { groq } from 'next-sanity';

export const blogPostQuery = groq`*[_type == 'post' && slug.current == $slug][0]{ ..., "authors": authors[].teamMember->, "readMorePosts": readMorePosts[].post->, body[] {..., markDefs[] { ...,  _type == "internalLinkAnnotation" => { "contentType": @.reference->_type,  "slug": @.reference->slug.current, "title": @.reference->title, "excerpt": @.reference->excerpt  } }} }`;
export const blogPostPathsQuery = groq`*[_type == 'post' && defined(slug) && publishedAt < now()]{ slug }`;
