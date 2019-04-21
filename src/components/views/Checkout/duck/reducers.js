import {
    UPDATE_FIRST_NAME,
    UPDATE_LAST_NAME,
    UPDATE_ADDRESS,
    UPDATE_CITY,
    UPDATE_STATE,
    UPDATE_ZIPCODE,
    UPDATE_SHIPPING_OPTION_ID,
} from './types';

const checkout = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    shippingOptionId: 1,
};

export default (state = checkout, { type, payload } = {}) => {
    switch (type) {
        case UPDATE_FIRST_NAME:
            return {
                ...state,
                firstName: payload.firstName,
            };
        case UPDATE_LAST_NAME:
            return {
                ...state,
                lastName: payload.lastName,
            };
        case UPDATE_ADDRESS:
            return {
                ...state,
                address: payload.address,
            };
        case UPDATE_CITY:
            return {
                ...state,
                city: payload.city,
            };
        case UPDATE_STATE:
            return {
                ...state,
                state: payload.state,
            };
        case UPDATE_ZIPCODE:
            return {
                ...state,
                zipCode: payload.zipCode,
            };
        case UPDATE_SHIPPING_OPTION_ID:
            return {
                ...state,
                shippingOptionId: parseInt(payload.shippingOptionId, 10),
            };
        default:
            return state;
    }
};
