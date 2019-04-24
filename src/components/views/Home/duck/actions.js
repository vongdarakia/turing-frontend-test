import {
    STORE_USER,
    CLEAR_USER,
    SELECT_CATEGORY,
    CLEAR_CATEGORY,
    SELECT_DEPARTMENT,
    CLEAR_DEPARTMENT,
    OPEN_REGISTER_MODAL,
    CLOSE_REGISTER_MODAL,
    OPEN_CHECKOUT_MODAL,
    CLOSE_CHECKOUT_MODAL,
    CLOSE_LOGIN_MODAL,
    OPEN_LOGIN_MODAL,
    STORE_DEPARTMENTS,
    STORE_CATEGORIES,
    OPEN_PRODUCT_DETAIL_MODAL,
    CLOSE_PRODUCT_DETAIL_MODAL,
} from './types';
import TuringAPI from '../../../../api';
import { KEY_TOKEN } from '../../../../api/config';

export const storeUser = ({ user }) => ({
    type: STORE_USER,
    payload: {
        user,
    },
});

export const clearUser = () => ({
    type: CLEAR_USER,
});

export const registerAccount = ({ name, email, password }) => async (
    dispatch,
) => {
    const response = await TuringAPI.register({ name, email, password });

    if (response.customer) {
        window.localStorage[KEY_TOKEN] = response.accessToken;
        dispatch(storeUser({ user: response.customer }));
    }
    return response;
};

export const login = ({ email, password }) => async (dispatch) => {
    const response = await TuringAPI.login({ email, password });

    if (response.customer) {
        window.localStorage[KEY_TOKEN] = response.accessToken;
        dispatch(storeUser({ user: response.customer }));
    }
    return response;
};

export const loginWithFacebook = ({ accessToken }) => async (dispatch) => {
    const response = await TuringAPI.loginWithFacebook({ accessToken });

    if (response.customer) {
        window.localStorage[KEY_TOKEN] = response.accessToken;
        dispatch(storeUser({ user: response.customer }));
    }
    return response;
};

export const logOut = () => async (dispatch) => {
    delete window.localStorage[KEY_TOKEN];

    dispatch(clearUser());
};

export const getCustomer = () => async (dispatch) => {
    const response = await TuringAPI.getCustomer();

    if (response.customer) {
        dispatch(storeUser({ user: response.customer }));
    }
    return response;
};

export const selectCategory = (category) => ({
    type: SELECT_CATEGORY,
    payload: { category },
});

export const clearCategory = () => ({
    type: CLEAR_CATEGORY,
});

export const storeCategories = (categories) => ({
    type: STORE_CATEGORIES,
    payload: { categories },
});

export const selectDepartment = (department) => ({
    type: SELECT_DEPARTMENT,
    payload: { department },
});

export const clearDepartment = () => ({
    type: CLEAR_DEPARTMENT,
});

export const storeDepartments = (departments) => ({
    type: STORE_DEPARTMENTS,
    payload: { departments },
});

export const openLoginModal = () => ({
    type: OPEN_LOGIN_MODAL,
});

export const closeLoginModal = () => ({
    type: CLOSE_LOGIN_MODAL,
});

export const openRegisterModal = () => ({
    type: OPEN_REGISTER_MODAL,
});

export const closeRegisterModal = () => ({
    type: CLOSE_REGISTER_MODAL,
});

export const openCheckoutModal = () => ({
    type: OPEN_CHECKOUT_MODAL,
});

export const closeCheckoutModal = () => ({
    type: CLOSE_CHECKOUT_MODAL,
});

export const openProductDetailModal = (productId) => ({
    type: OPEN_PRODUCT_DETAIL_MODAL,
    payload: { productId },
});

export const closeProductDetailModal = () => ({
    type: CLOSE_PRODUCT_DETAIL_MODAL,
});
