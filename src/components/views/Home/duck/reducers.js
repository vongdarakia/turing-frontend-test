import {
    STORE_USER,
    CLEAR_USER,
    SELECT_CATEGORY,
    SELECT_DEPARTMENT,
    CLEAR_CATEGORY,
    CLEAR_DEPARTMENT,
    OPEN_CHECKOUT_MODAL,
    OPEN_LOGIN_MODAL,
    OPEN_REGISTER_MODAL,
    CLOSE_CHECKOUT_MODAL,
    CLOSE_LOGIN_MODAL,
    CLOSE_REGISTER_MODAL,
    STORE_CATEGORIES,
    STORE_DEPARTMENTS,
} from './types';

const main = {
    user: null,
    selectedCategory: null,
    selectedDepartment: null,
    departments: [],
    categories: [],
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isCheckoutModalOpen: false,
};

export default (state = main, { type, payload } = {}) => {
    switch (type) {
        case CLEAR_USER:
            return {
                ...state,
                user: null,
            };
        case STORE_USER:
            if (payload.user && payload.user.error) {
                return {
                    ...state,
                    user: null,
                };
            }
            return {
                ...state,
                user: { ...payload.user },
            };
        case STORE_CATEGORIES:
            return {
                ...state,
                categories: payload.categories || [],
            };
        case STORE_DEPARTMENTS:
            return {
                ...state,
                departments: payload.departments || [],
            };
        case SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: payload.category,
            };
        case SELECT_DEPARTMENT:
            return {
                ...state,
                selectedDepartment: payload.department,
                selectedCategory: null,
            };
        case CLEAR_CATEGORY:
            return {
                ...state,
                selectedCategory: null,
            };
        case CLEAR_DEPARTMENT:
            return {
                ...state,
                selectedDepartment: null,
            };
        case OPEN_CHECKOUT_MODAL:
            return {
                ...state,
                isCheckoutModalOpen: true,
            };
        case OPEN_LOGIN_MODAL:
            return {
                ...state,
                isLoginModalOpen: true,
            };
        case OPEN_REGISTER_MODAL:
            return {
                ...state,
                isRegisterModalOpen: true,
            };

        case CLOSE_CHECKOUT_MODAL:
            return {
                ...state,
                isCheckoutModalOpen: false,
            };
        case CLOSE_LOGIN_MODAL:
            return {
                ...state,
                isLoginModalOpen: false,
            };
        case CLOSE_REGISTER_MODAL:
            return {
                ...state,
                isRegisterModalOpen: false,
            };
        default:
            return state;
    }
};
