import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity';

interface SanityImageProps {
  image: { [key: string]: string };
  className?: string;
  fill?: boolean;
  width?: number;
  sizes?: string;
}

export default function SanityImage({
  image,
  className,
  fill = false,
  width = 800,
  sizes = '(max-width: 800px) 100vw, 800px',
}: SanityImageProps) {
  const imageProps = useNextSanityImage(sanityClient, image, {
    imageBuilder: (imageUrlBuilder, options) => imageUrlBuilder.width(Math.min(width, options.width)),
  });
  return fill ? (
    <Image
      src={imageProps.src}
      alt={image.alt}
      loader={imageProps.loader}
      layout="fill"
      sizes={sizes}
      objectFit="cover"
      className={className}
    />
  ) : (
    <Image {...imageProps} alt={image.alt} layout="responsive" sizes={sizes} className={className} />
  );
}
