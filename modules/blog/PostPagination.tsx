import { Link } from 'components/Link';
import { range } from 'utils/range';

interface PostPaginationProps {
  pageNumber: number;
  numberOfPages: number;
}

function BackArrow() {
  return (
    <svg className="stroke-current" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M16.5 4L8.5 12L16.5 20" strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
}

function ForwardArrow() {
  return (
    <svg className="stroke-current" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M8.5 20L16.5 12L8.5 4" strokeWidth="2" strokeMiterlimit="10" />
    </svg>
  );
}
export default function PostPagination({ pageNumber, numberOfPages }: PostPaginationProps) {
  pageNumber = Number(pageNumber);
  numberOfPages = Number(numberOfPages);
  const startRange = Math.max(1, pageNumber - 2);
  const endRange = Math.min(pageNumber + 3, numberOfPages + 1);
  const pageNavigation = range({ start: startRange, end: endRange, step: 1 });

  return (
    <div className="flex items-center justify-between w-full max-w-sm text-lg md:justify-start md:space-x-16 md:text-2xl md:leading-10">
      {pageNumber !== 1 ? (
        <Link href={`/blog/page/${pageNumber - 1}`}>
          <a>
            <BackArrow />
          </a>
        </Link>
      ) : (
        <div className="text-dawnDark-300">
          <BackArrow />
        </div>
      )}
      {pageNavigation.map((n) => {
        if (n === pageNumber) {
          return (
            <div key={n} className="font-medium text-dawnPurple-500">
              {n}
            </div>
          );
        }
        return (
          <Link key={n} href={`/blog/page/${n}`}>
            <a>{n}</a>
          </Link>
        );
      })}
      {pageNumber !== numberOfPages ? (
        <Link href={`/blog/page/${Number(pageNumber) + 1}`}>
          <a>
            <ForwardArrow />
          </a>
        </Link>
      ) : (
        <div className="text-dawnDark-300">
          <ForwardArrow />
        </div>
      )}
    </div>
  );
}
