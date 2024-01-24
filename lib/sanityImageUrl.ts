import { sanityClient } from './sanity';
import imageUrlBuilder from '@sanity/image-url';

const imageBuilder = imageUrlBuilder(sanityClient);

export default function sanityImageBuilder(source: any) {
  return imageBuilder.image(source);
}
