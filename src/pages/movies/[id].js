import Image from 'next/image';
import { fetchAllMovies, getMovieById } from '@/utils/api-movie';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function Movie({ movie }) {
    const router = useRouter();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths
    if (router.isFallback) {
        return <div className="container">Loading...</div>;
    }

    return (
        <Layout pageTitle={movie.title}>
            <div>
                <h1 className="text-center mb-4">{movie.title}</h1>
                <div className="movieDetail">
                    <Image
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={300}
                    />
                    <div>
                        <p>{movie.overview}</p>
                        <p>
                            <b>Released Date : </b>
                            {movie.release_date}
                        </p>
                        <p>
                            <b>Vote average : </b>
                            {movie.vote_average}/10
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export const getStaticPaths = async () => {
    const data = await fetchAllMovies();

    const paths = data.map((movie) => ({
        params: { id: movie.id.toString() },
    }));

    return {
        paths,
        fallback: true, // false or "blocking"
    };
};

export const getStaticProps = async ({ params }) => {
    const movie = await getMovieById(params.id);

    if (!movie) {
        return {
            notFound: true,
        };
    }

    return { props: { movie } };
};
