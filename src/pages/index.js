import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    console.log(inter.className);
    return (
        <Layout home>
            <Head>
                <title>Help me Find a movie !</title>
            </Head>
            <main
                className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
            >
                <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
                        <h2 className={`mb-3 text-2xl font-semibold`}>
                            <Link href="/movies">Accéder au catalogue</Link>{' '}
                            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                                -&gt;
                            </span>
                        </h2>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
