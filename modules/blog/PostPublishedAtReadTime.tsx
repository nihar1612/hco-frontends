import { parseISO } from 'date-fns';
import { dateFormat } from 'utils/date-utils';

interface PostPublishedAtReadTimeProps {
  publishedAt?: string;
  readTime?: number;
}

export default function PostPublishedAtReadTime({ publishedAt, readTime }: PostPublishedAtReadTimeProps) {
  return (
    <div className="text-sm font-medium tracking-widest uppercase md:text-base md:leading-4 text-dawnDark-300">
      {publishedAt ? dateFormat(parseISO(publishedAt), { formatStr: 'MMM d, yyyy' }) : ''} • {readTime || ''} min read
    </div>
  );
}
