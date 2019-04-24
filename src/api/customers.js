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
            return response;
        } catch (error) {
            return { error };
        }
    },

    register: async ({ name, email, password } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/customers`, {
                method: 'post',
                headers: getBasicHeaders(),
                body: prepareRequestBody({ name, email, password }),
            });

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

            return response.json();
        } catch (error) {
            return { error };
        }
    },

    loginWithFacebook: async ({ accessToken } = {}) => {
        try {
            const response = await fetch(`${apiUrl}/customers/facebook`, {
                method: 'post',
                headers: getBasicHeaders(),
                body: prepareRequestBody({ access_token: accessToken }),
            });

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
                address_1 === undefined ||
                city === undefined ||
                region === undefined ||
                postal_code === undefined ||
                country === undefined ||
                shipping_region_id === undefined
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

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error.message);
            }

            return result;
        } catch (error) {
            return { error };
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
            return response;
        } catch (error) {
            return { error };
        }
    },
};
