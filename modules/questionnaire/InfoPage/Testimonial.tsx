import { useNextSanityImage } from 'next-sanity-image';
import { Description } from './Description';
import { sanityClient } from 'lib/sanity';

interface TestimonialProps {
  avatar: any;
  author: string;
}
export const Testimonial: React.FC<TestimonialProps> = ({ children, avatar, author }) => {
  const imageProps = useNextSanityImage(sanityClient, avatar);
  return (
    <div className="p-y-8 bg-white rounded-2xl bg-opacity-5">
      <Description>“{children}”</Description>
      <div className="flex items-center justify-center mt-6">
        <img src={imageProps?.src} className="w-8 h-8 rounded-full" alt="icon" />
        <p className="pl-3 text-base">{author}</p>
      </div>
    </div>
  );
};
