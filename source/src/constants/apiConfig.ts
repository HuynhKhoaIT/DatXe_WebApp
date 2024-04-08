import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    products: {
        getList: {
            baseURL: `${apiUrl}api/products`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/products/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        getReviewById:{
            baseURL: `${apiUrl}api/reviews/product/:id`,
            method: 'GET',
            headers: baseHeader,
        }
    },
    category:{
        getList: {
            baseURL: `${apiUrl}api/products`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/products/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    posts:{
        getList: {
            baseURL: `${apiUrl}api/posts`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/posts/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    }
};

export default apiConfig;
