import { getBasicHeaders, getAuthHeaders, apiUrl } from './config';

export const getCustomer = async () => {
    try {
        const data = await fetch(`${apiUrl}/customer`, {
            method: 'get',
            headers: getAuthHeaders(),
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const updateCustomer = async ({
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
            throw new Error('Name and email are required to update profile');
        }

        const data = await fetch(`${apiUrl}/customer`, {
            method: 'put',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                name,
                email,
                password,
                day_phone,
                eve_phone,
                mob_phone,
            }),
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const register = async ({ name, email, password } = {}) => {
    try {
        const data = await fetch(`${apiUrl}/customers`, {
            method: 'post',
            headers: getBasicHeaders(),
            body: JSON.stringify({ name, email, password }),
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const signin = async ({ email, password } = {}) => {
    try {
        const data = await fetch(`${apiUrl}/customers/login`, {
            method: 'post',
            headers: getBasicHeaders(),
            body: JSON.stringify({ email, password }),
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const updateCustomerAddress = async ({
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

        const data = await fetch(`${apiUrl}/customers/address`, {
            method: 'put',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                address_1,
                address_2,
                city,
                region,
                postal_code,
                country,
                shipping_region_id,
            }),
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

export const updateCustomerCreditCard = async ({ credit_card } = {}) => {
    try {
        if (!credit_card) {
            throw new Error(
                'credit_card is required to update the credit card',
            );
        }

        const data = await fetch(`${apiUrl}/customers/creditCard`, {
            method: 'put',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                credit_card,
            }),
        });
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};
