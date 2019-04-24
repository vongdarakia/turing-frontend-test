import { getBasicHeaders, apiUrl } from './config';

export default {
    getAllAttributes: async () => {
        try {
            const response = await fetch(`${apiUrl}/attributes`, {
                method: 'get',
                headers: getBasicHeaders(),
            });

            const attributes = await response.json();

            if (attributes.error) {
                throw new Error(attributes.error.message);
            }
            return attributes;
        } catch (error) {
            return { error };
        }
    },

    getAttributesByProductId: async ({ product_id }) => {
        try {
            const response = await fetch(
                `${apiUrl}/attributes/inProduct/${product_id}`,
                {
                    method: 'get',
                    headers: getBasicHeaders(),
                },
            );

            const attributes = await response.json();

            if (attributes && attributes.error) {
                throw new Error(attributes.error.message);
            }
            return attributes;
        } catch (error) {
            return { error };
        }
    },
};
