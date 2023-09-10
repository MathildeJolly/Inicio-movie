import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import { useEffect, useState } from 'react';
import { fetchAllMovies } from '@/utils/api-movie';
import { useRouter } from 'next/router';

export default function Movies({ movies }) {
    const [updatedMovies, setUpdatedMovies] = useState(movies);
    const [currentPage, setCurrentPage] = useState(1);
    const { query } = useRouter();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    async function handlePageChange(newPage) {
        setCurrentPage(newPage);

        const newMovies = await fetchAllMovies(newPage);
        setUpdatedMovies(newMovies);
    }

    return (
        <Layout>
            <div>
                <h1 className="text-center mb-8">Trending Movies Catalog</h1>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
                    {updatedMovies?.map((element, index) => (
                        <MovieCard key={index} element={element} />
                    ))}
                </div>
                <div className="pagination" onClick={scrollToTop}>
                    <div>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>

                        <span>{currentPage}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticProps = async () => {
    const allMovies = await fetchAllMovies();

    return { props: { movies: allMovies } };
};
