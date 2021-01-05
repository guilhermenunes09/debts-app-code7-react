
const api = {
    rails: {
        host: 'http://localhost:3000/',
        api: 'api/debts',
    },
    jsonplaceholder: {
        host: 'https://jsonplaceholder.typicode.com/',
        api: 'users',
    }
}

export const API_RAILS = api.rails.host.concat(api.rails.api);
export const API_JSON = api.jsonplaceholder.host.concat(api.jsonplaceholder.api);