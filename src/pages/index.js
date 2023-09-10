import { Inter } from 'next/font/google';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <Layout home>
            <Head>
                <title>Help me Find a movie !</title>
            </Head>
            <main
                className={`flex min-h-screen items-center justify-center p-24 ${inter.className}`}
            >
                <Link href="/movies">
                    <div className="group h-16 rounded-lg border border-transparent px-5 pt-3 pb-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30">
                        <h2>
                            Display catalog{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                    </div>
                </Link>
            </main>
        </Layout>
    );
}
