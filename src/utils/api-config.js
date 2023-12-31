export const baseUrl = 'https://image.tmdb.org/t/p/original/';

export function getApiOptionsFetch(method) {
    return {
        method: method,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
    };
}

