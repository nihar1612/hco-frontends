import { useNextSanityImage } from 'next-sanity-image';
import { sanityClient } from 'lib/sanity';

interface DescriptionImageProps {
  image: any;
}
export const DescriptionImage: React.FC<DescriptionImageProps> = ({ image }) => {
  const imageProps = useNextSanityImage(sanityClient, image);
  return <img src={imageProps?.src} alt="" height={30} width={130}/>;
};
