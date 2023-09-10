import { getApiOptionsFetch } from './api-config';

const resultsPerPage = 50;
const apiKey = '7ebbbd274903815b31ed653d6e29f420';

async function fetchMovies(page, timeframe) {
    const data = await fetch(
        `https://api.themoviedb.org/3/trending/movie/${timeframe}?language=en-US&api_key=${apiKey}&page=${page}`,
        getApiOptionsFetch('GET')
    );

    const movies = await data.json();

    return movies.results;
}

export async function getMovieById(id) {
    const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`,
        getApiOptionsFetch('GET')
    );

    return await data.json();
}

export async function fetchAllMovies(currentPage = 1, timeframe = 'day') {
    if (currentPage < 1) {
        currentPage = 1;
    }

    const allResults = [];
    const apiPageStart = currentPage * 2 - 1;
    const apiPageEnd = currentPage * 2 + 1;

    for (let page = apiPageStart; page <= apiPageEnd; page++) {
        const results = await fetchMovies(page, timeframe);
        allResults.push(...results);
    }

    return currentPage % 2 == 0
        ? allResults.slice(10)
        : allResults.slice(0, resultsPerPage);
}
