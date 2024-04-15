import { apiUrl } from '.';

const baseHeader = {
    'Content-Type': 'application/json',
};

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
};

const apiConfig = {
    file: {
        upload: {
            baseURL: `https://up-image.dlbd.vn/api/image`,
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
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
        },
        getRelate: {
            baseURL: `${apiUrl}api/products/related-products/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        getProductHot: {
            baseURL: `${apiUrl}api/products`,
            method: 'GET',
            headers: baseHeader,
        },
        getServiceHot: {
            baseURL: `${apiUrl}api/products`,
            method: 'GET',
            headers: baseHeader,
        },
        
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
        orderCategory:{
            baseURL: `${apiUrl}api/order-category`,
            method: 'GET',
            headers: baseHeader,
        }
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
    },
    car:{
        getList: {
            baseURL: `${apiUrl}api/client/cars`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/client/cars/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        // getBrandCar:{
        //     baseURL: `${apiUrl}api/cars/:id`,
        //     method: 'GET',
        //     headers: baseHeader,
        // }
    },
    amentity:{
        getList: {
            baseURL: `${apiUrl}api/admin/amentity`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/admin/amentity/:id`,
            method: 'GET',
            headers: baseHeader,
        },
        create: {
            baseURL: `${apiUrl}api/admin/amentity`,
            method: 'POST',
            headers: baseHeader,
        },
        update: {
            baseURL: `${apiUrl}api/admin/amentity/:id`,
            method: 'PUT',
            headers: baseHeader,
        },
        // getBrandCar:{
        //     baseURL: `${apiUrl}api/cars/:id`,
        //     method: 'GET',
        //     headers: baseHeader,
        // }
    },
    garage:{
        getList: {
            baseURL: `${apiUrl}api/client/cars`,
            method: 'GET',
            headers: baseHeader,
        },
        getById: {
            baseURL: `${apiUrl}api/client/cars/:id`,
            method: 'GET',
            headers: baseHeader,
        },
    },
    banner:{
        getList: {
            baseURL: `${apiUrl}api/slide-banner`,
            method: 'GET',
            headers: baseHeader,
        },
    }

};

export default apiConfig;
