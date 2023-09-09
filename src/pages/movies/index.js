import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import { getOptionsApi } from '@/utils/api-config';

export default function Movies(movies) {
    return (
        <Layout>
            <Head>
                <title>Movie Catalogue</title>
            </Head>
            <div>
                <h1>Catalogue</h1>
                <div className="grid gap-4 grid-cols-3">
                    {movies?.results?.map((element) => (
                        <MovieCard key={element.id} element={element} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const res = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
        getOptionsApi('GET')
    );
    const movies = await res.json();

    return { props: movies };
};
