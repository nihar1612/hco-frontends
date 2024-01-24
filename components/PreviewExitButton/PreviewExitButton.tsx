import Link from 'next/link';
import { useRouter } from 'next/router';

export function PreviewExitButton() {
  const router = useRouter();
  return (
    <div className="relative">
      <div className="fixed right-0 z-10 px-2 py-2 bg-white rounded-bl bg-opacity-10">
        <Link href={`/api/exit-preview?redirect=${router.asPath}`}>
          <a className="text-xl font-bold cursor-pointer">Exit preview</a>
        </Link>
      </div>
    </div>
  );
}
