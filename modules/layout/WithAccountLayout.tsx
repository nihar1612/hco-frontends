import Head from 'next/head';
import { Logo } from 'components/DawnLogo/DawnLogo';

interface WithAccountLayoutProps {
  title: string;
  children: React.ReactNode;
}
export function WithAccountLayout({ title, children }: WithAccountLayoutProps) {
  return (
    <>
      <Head>
        <title>{title ?? 'Account | Dawn Health'}</title>
        <meta name="description" content="Signup for a new account | Dawn health" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="min-h-screen px-6 py-4 overflow-hidden text-white md:px-20">
        <style jsx global>{`
          // This prevents a white background when scrolling on mobile:
          body {
            background-color: rgba(17, 22, 30, 1);
          }
        `}</style>
        <div className="top-0 left-0 z-20 flex items-center justify-center w-full px-20 pt-2 xl:pt-6 xl:pb-8 xl:fixed bg-dawnDark-700">
          <Logo />
        </div>
        <div className="pt-3 pb-16 md:pt-14">{children}</div>
      </main>
    </>
  );
}
