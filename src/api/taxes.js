import { getBasicHeaders, apiUrl } from './config';

export default {
    getAllTaxes: async () => {
        try {
            const response = await fetch(`${apiUrl}/tax`, {
                method: 'get',
                headers: getBasicHeaders(),
            });

            const taxes = await response.json();
            return taxes;
        } catch (error) {
            return { error };
        }
    },

    getTaxById: async ({ tax_id } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/tax/${tax_id}`, {
                method: 'get',
                headers: getBasicHeaders(),
            });

            const tax = await response.json();
            return tax;
        } catch (error) {
            return { error };
        }
    },
};
