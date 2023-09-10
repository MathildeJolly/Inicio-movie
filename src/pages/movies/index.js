import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import { useCallback, useEffect, useState } from 'react';
import { fetchAllMovies } from '@/utils/api-movie';
import { useRouter } from 'next/router';

export default function Movies({ movies }) {
    const [updatedMovies, setUpdatedMovies] = useState(movies);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(router.query.page || 1);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (!router.query.page) {
            return;
        }

        handlePageChange(router.query.page);
    }, [router.query.page]);

    async function handlePageChange(newPage) {
        router.query.page = newPage;
        router.push(router);

        setCurrentPage(parseInt(newPage));
        updateMovies(newPage);
    }

    const updateMovies = useCallback(async (page) => {
        const newMovies = await fetchAllMovies(page);
        setUpdatedMovies(newMovies);

        return newMovies;
    });

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
