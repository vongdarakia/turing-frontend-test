import { getBasicHeaders, getAuthHeaders, apiUrl } from './config';
import prepareRequestParams from '../utils/prepare-request-params';

export default {
    getAllProducts: async ({ page, limit, description_length } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/products${prepareRequestParams({
                    page,
                    limit,
                    description_length,
                })}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

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
            const response = await fetch(
                `${apiUrl}/products/search${prepareRequestParams({
                    query_string,
                    all_words,
                    page,
                    limit,
                    description_length,
                })}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

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
                `${apiUrl}/products/inCategory/${category_id}${prepareRequestParams(
                    {
                        category_id,
                        page,
                        limit,
                        description_length,
                    },
                )}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
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
                `${apiUrl}/products/inDepartment/${department_id}${prepareRequestParams(
                    {
                        department_id,
                        page,
                        limit,
                        description_length,
                    },
                )}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
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
                `${apiUrl}/products/${product_id}/reviews${prepareRequestParams(
                    {
                        product_id,
                        review,
                        rating,
                    },
                )}`,
                {
                    method: 'post',
                    headers: getAuthHeaders(),
                },
            );

            return response.json();
        } catch (error) {
            return { error };
        }
    },
};
