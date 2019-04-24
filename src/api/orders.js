import { getAuthHeaders, apiUrl } from './config';
import prepareRequestBody from '../utils/prepare-request-body';

export default {
    createOrder: async ({ cart_id, customer_id, shipping_id, tax_id }) => {
        try {
            const response = await fetch(`${apiUrl}/orders`, {
                method: 'post',
                headers: getAuthHeaders(),
                body: prepareRequestBody({
                    cart_id,
                    customer_id,
                    shipping_id,
                    tax_id,
                }),
            });

            const result = await response.json();
            return result;
        } catch (error) {
            return { error };
        }
    },

    getOrderById: async ({ order_id }) => {
        try {
            const response = await fetch(`${apiUrl}/orders/${order_id}`, {
                method: 'get',
                headers: getAuthHeaders(),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return { error };
        }
    },

    getOrdersOfCustomer: async () => {
        try {
            const response = await fetch(`${apiUrl}/orders/inCustomer`, {
                method: 'get',
                headers: getAuthHeaders(),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return { error };
        }
    },

    getShortDetailOrder: async ({ order_id }) => {
        try {
            const response = await fetch(
                `${apiUrl}/orders/shortDetail/${order_id}`,
                {
                    method: 'get',
                    headers: getAuthHeaders(),
                },
            );
            const result = await response.json();
            return result;
        } catch (error) {
            return { error };
        }
    },
};
