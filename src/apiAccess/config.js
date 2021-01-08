
const HOST = process.env.REACT_APP_API_HOST

const api = {
    rails: {
        host: HOST,
        api: {
            debts: 'api/debts',
            users: 'api/users',
        },
    },
    jsonplaceholder: {
        host: 'https://jsonplaceholder.typicode.com/',
        api: 'users',
    }
}

export const API_RAILS = api.rails.host.concat(api.rails.api.debts);
export const API_RAILS_USER = api.rails.host.concat(api.rails.api.users);
export const API_JSON = api.jsonplaceholder.host.concat(api.jsonplaceholder.api);