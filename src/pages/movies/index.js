import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import { useCallback, useEffect, useState } from 'react';
import { fetchAllMovies } from '@/utils/api-movie';
import { useRouter } from 'next/router';
import Toggle from '@/components/Toggle';

export default function Movies({ movies }) {
    const [updatedMovies, setUpdatedMovies] = useState(movies);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(router.query.page || 1);
    const [timeframe, setTimeframe] = useState(router.query.timeframe || 'day');

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (!router.query.page || !router.query.timeframe) {
            return;
        }

        handlePageChange(router.query.page);
    }, [router.query.page]);

    useEffect(() => {
        router.query.timeframe = timeframe;
        router.push(router);

        updateMovies();
    }, [router.query.timeframe, timeframe]);

    async function handlePageChange(newPage) {
        router.query.page = newPage;
        router.push(router);

        setCurrentPage(parseInt(newPage));
        updateMovies(newPage);
    }

    const updateMovies = useCallback(async () => {
        const newMovies = await fetchAllMovies(
            currentPage,
            router.query.timeframe
        );
        setUpdatedMovies(newMovies);

        return newMovies;
    });

    function handleToggleChange(checked) {
        setTimeframe(checked ? 'day' : 'week');
    }

    return (
        <Layout>
            <div>
                <h1 className="text-center mb-8">Trending Movies Catalog</h1>
                <Toggle
                    checked={timeframe === 'day' ? true : false}
                    handleToggleChange={handleToggleChange}
                />
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
