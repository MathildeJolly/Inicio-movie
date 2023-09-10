import Layout from '@/components/Layout';
import MovieCard from '@/components/MovieCard';
import { useEffect, useState } from 'react';
import { getMovieById } from '@/utils/api-movie';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';

export default function Wishlist() {
    const router = useRouter();
    const { wishlist, addToWishlist, removeFromWishlist } = useAppContext();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getMoviesFromApi = async () => {
            const movies = [];

            for (const movieId of wishlist) {
                const movie = await getMovieById(movieId);
                movies.push(movie);
            }

            setMovies(movies);
        };

        getMoviesFromApi();
    }, [wishlist]);

    return (
        <Layout>
            <div>
                <h1 className="text-center mb-8">My wishlist</h1>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-5">
                    {movies?.map((element, index) => (
                        <MovieCard
                            key={index}
                            element={element}
                            addToWishlist={addToWishlist}
                            removeFromWishlist={removeFromWishlist}
                            isInWishlist={wishlist.includes(element.id)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
