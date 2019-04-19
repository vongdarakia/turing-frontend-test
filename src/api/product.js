import { getBasicHeaders, getAuthHeaders, apiUrl } from './config';
import prepareRequestBody from '../utils/prepare-request-body';

export default {
    getAllProducts: async ({ page, limit, description_length } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/products`, {
                method: 'get',
                headers: getBasicHeaders(),
                body: prepareRequestBody({ page, limit, description_length }),
            });

            const { rows, count } = await response.json();
            return { products: rows, count };
        } catch (error) {
            return { error };
        }
    },

    searchProducts: async ({
        query_string,
        all_words,
        page,
        limit,
        description_length,
    } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/products/search`, {
                method: 'get',
                headers: getBasicHeaders(),
                body: prepareRequestBody({
                    query_string,
                    all_words,
                    page,
                    limit,
                    description_length,
                }),
            });

            const { rows, count } = await response.json();
            return { products: rows, count };
        } catch (error) {
            return { error };
        }
    },

    getProductById: async ({ product_id } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/products/${product_id}`, {
                method: 'get',
                headers: getBasicHeaders(),
                body: prepareRequestBody({ product_id }),
            });

            const product = await response.json();
            return product;
        } catch (error) {
            return { error };
        }
    },

    getProductsByCategory: async ({
        category_id,
        page,
        limit,
        description_length,
    } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products/inCategory/${category_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                    body: prepareRequestBody({
                        category_id,
                        page,
                        limit,
                        description_length,
                    }),
                },
            );

            const { rows, count } = await response.json();
            return { products: rows, count };
        } catch (error) {
            return { error };
        }
    },

    getProductsByDepartment: async ({
        department_id,
        page,
        limit,
        description_length,
    } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products/inDepartment/${department_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                    body: prepareRequestBody({
                        department_id,
                        page,
                        limit,
                        description_length,
                    }),
                },
            );

            const { rows, count } = await response.json();
            return { products: rows, count };
        } catch (error) {
            return { error };
        }
    },

    getProductDetails: async ({ product_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products/${product_id}/details`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                    body: prepareRequestBody({
                        product_id,
                    }),
                },
            );

            return response.json();
        } catch (error) {
            return { error };
        }
    },

    getProductLocations: async ({ product_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products/${product_id}/locations`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                    body: prepareRequestBody({
                        product_id,
                    }),
                },
            );

            return response.json();
        } catch (error) {
            return { error };
        }
    },

    getProductReviews: async ({ product_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products/${product_id}/reviews`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                    body: prepareRequestBody({
                        product_id,
                    }),
                },
            );

            return response.json();
        } catch (error) {
            return { error };
        }
    },

    postProductReviews: async ({ product_id, review, rating } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products/${product_id}/reviews`,
                {
                    method: 'post',
                    headers: getAuthHeaders(),
                    body: prepareRequestBody({
                        product_id,
                        review,
                        rating,
                    }),
                },
            );

            return response.json();
        } catch (error) {
            return { error };
        }
    },
};
