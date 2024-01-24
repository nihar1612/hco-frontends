import Head from 'next/head';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';

interface WithLegalLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function WithAccountLayout({ title, children }: WithLegalLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Dawn Health</title>
        <meta name="description" content={`Dawn health ${title}`} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar className="bg-dawnDark-700" />
      <main className="flex justify-center pb-20 mx-6">
        <div className="mt-12">
          <h1 className="text-3xl font-bold text-center md:text-5xl">{title}</h1>
          <div className="mt-8 prose md:mt-12 lg:prose-lg xl:prose-xl font-inter">{children}</div>
        </div>
      </main>
      <Footer className="bg-dawnDark-700" />
    </>
  );
}
