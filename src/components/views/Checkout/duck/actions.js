import {
    UPDATE_FIRST_NAME,
    UPDATE_LAST_NAME,
    UPDATE_ADDRESS,
    UPDATE_CITY,
    UPDATE_STATE,
    UPDATE_ZIPCODE,
    UPDATE_SHIPPING_OPTION_ID,
} from './types';

export const updateFirstName = (firstName) => ({
    type: UPDATE_FIRST_NAME,
    payload: { firstName },
});

export const updateLastName = (lastName) => ({
    type: UPDATE_LAST_NAME,
    payload: { lastName },
});

export const updateAddress = (address) => ({
    type: UPDATE_ADDRESS,
    payload: { address },
});

export const updateCity = (city) => ({
    type: UPDATE_CITY,
    payload: { city },
});

export const updateState = (state) => ({
    type: UPDATE_STATE,
    payload: { state },
});

export const updateZipCode = (zipCode) => ({
    type: UPDATE_ZIPCODE,
    payload: { zipCode },
});

export const updateShippingOptionId = (shippingOptionId) => ({
    type: UPDATE_SHIPPING_OPTION_ID,
    payload: { shippingOptionId },
});
