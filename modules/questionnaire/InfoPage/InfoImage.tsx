import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity';

interface InfoImageProps {
  image: any;
}
export const InfoImage: React.FC<InfoImageProps> = ({ image }) => {
  const imageProps = useNextSanityImage(sanityClient, image);
  return <img src={imageProps?.src} className="w-14 h-14" alt="" />;
};
