import { getApiOptionsFetch } from './api-config';

const resultsPerPage = 50;
const apiKey = '7ebbbd274903815b31ed653d6e29f420';

async function fetchMovies(page) {
    const data = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${apiKey}&page=${page}`,
        getApiOptionsFetch('GET')
    );

    const movies = await data.json();

    return movies.results;
}

export async function fetchAllMovies(currentPage = 1) {
    if (currentPage < 1) {
        currentPage = 1;
    }

    const allResults = [];
    const apiPageStart = currentPage * 2 - 1;
    const apiPageEnd = currentPage * 2 + 1;

    for (let page = apiPageStart; page <= apiPageEnd; page++) {
        const results = await fetchMovies(page);
        allResults.push(...results);
    }

    return currentPage % 2 == 0
        ? allResults.slice(10)
        : allResults.slice(0, resultsPerPage);
}
