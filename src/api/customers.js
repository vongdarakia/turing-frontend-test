import { getBasicHeaders, getAuthHeaders, apiUrl } from './config';
import prepareRequestBody from '../utils/prepare-request-body';

export default {
    getCustomer: async () => {
        try {
            const response = await fetch(`${apiUrl}/customer`, {
                method: 'get',
                headers: getAuthHeaders(),
            });

            return {
                customer: await response.json(),
            };
        } catch (error) {
            return { error };
        }
    },

    updateCustomer: async ({
        name,
        email,
        password,
        day_phone,
        eve_phone,
        mob_phone,
    }) => {
        try {
            // TODO: Can be made cleaner to show specific attributes that are missing
            if (!(name && email)) {
                throw new Error(
                    'Name and email are required to update profile',
                );
            }

            const response = await fetch(`${apiUrl}/customer`, {
                method: 'put',
                headers: getAuthHeaders(),
                body: prepareRequestBody({
                    name,
                    email,
                    password,
                    day_phone,
                    eve_phone,
                    mob_phone,
                }),
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    register: async ({ name, email, password } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/customers`, {
                method: 'post',
                headers: getBasicHeaders(),
                body: prepareRequestBody({ name, email, password }),
            });
            console.log(response);
            return response.json();
        } catch (error) {
            return { error };
        }
    },

    login: async ({ email, password } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/customers/login`, {
                method: 'post',
                headers: getBasicHeaders(),
                body: prepareRequestBody({ email, password }),
            });
            console.log(response);
            return response.json();
        } catch (error) {
            return { error };
        }
    },

    updateCustomerAddress: async ({
        address_1,
        address_2,
        city,
        region,
        postal_code,
        country,
        shipping_region_id,
    } = {}) => {
        try {
            // TODO: Can be made cleaner to show specific attributes that are missing
            if (
                !(
                    address_1 &&
                    city &&
                    region &&
                    postal_code &&
                    country &&
                    shipping_region_id
                )
            ) {
                throw new Error(
                    'address_1, city, region, postal_code, country and shipping_region_id are required to update address',
                );
            }

            const response = await fetch(`${apiUrl}/customers/address`, {
                method: 'put',
                headers: getAuthHeaders(),
                body: prepareRequestBody({
                    address_1,
                    address_2,
                    city,
                    region,
                    postal_code,
                    country,
                    shipping_region_id,
                }),
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },

    updateCustomerCreditCard: async ({ credit_card } = {}) => {
        try {
            if (!credit_card) {
                throw new Error(
                    'credit_card is required to update the credit card',
                );
            }

            const response = await fetch(`${apiUrl}/customers/creditCard`, {
                method: 'put',
                headers: getAuthHeaders(),
                body: prepareRequestBody({
                    credit_card,
                }),
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    },
};
