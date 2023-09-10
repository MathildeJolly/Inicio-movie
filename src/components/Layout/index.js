import Head from 'next/head';
import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';

const siteTitle = 'InicioMovie';

export default function Layout({ children, home }) {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                {!home && (
                    <>
                        <h2>
                            <Link href="/">← Back to home</Link>
                        </h2>
                    </>
                )}
            </header>
            <main className={!home ? 'container' : ''}>{children}</main>
        </div>
    );
}
