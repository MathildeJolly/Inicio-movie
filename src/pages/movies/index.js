import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';

export default function Movies(movies) {
    console.log(movies.results);
    return (
        <Layout>
            <Head>
                <title>Movie Catalogue</title>
            </Head>

            <div>
                <h1>Catalogue</h1>
                <div className="grid gap-4 grid-cols-3">
                    {movies?.results.map((element) => (
                        <MovieCard key={element.id} element={element} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export const getServerSideProps = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
    };

    const res = await fetch(
        'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
        options
    );
    const movies = await res.json();

    return { props: movies };
};