import { getBasicHeaders, apiUrl } from './config';
import prepareRequestParams from '../utils/prepare-request-params';

export default {
    getAllCategories: async ({ order, page, limit } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/categories${prepareRequestParams({
                    order,
                    page,
                    limit,
                })}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const { rows, count } = await response.json();
            return { categories: rows, count };
        } catch (error) {
            return { error };
        }
    },

    getCategoryById: async ({ category_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/categories/${category_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const category = await response.json();
            return category;
        } catch (error) {
            return { error };
        }
    },

    getCategoriesByProduct: async ({ product_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/categories/inProduct/${product_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const categories = await response.json();
            return categories;
        } catch (error) {
            return { error };
        }
    },

    getCategoriesByDepartment: async ({ department_id } = {}) => {
        try {
            const response = await fetch(
                `${apiUrl}/categories/inDepartment/${department_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const categories = await response.json();
            return categories;
        } catch (error) {
            return { error };
        }
    },
};
