import {
    STORE_USER,
    CLEAR_USER,
    SELECT_CATEGORY,
    SELECT_DEPARTMENT,
    CLEAR_CATEGORY,
    CLEAR_DEPARTMENT,
} from './types';

const main = {
    user: null,
    selectedCategory: null,
    selectedDepartment: null,
};

export default (state = main, { type, payload } = {}) => {
    switch (type) {
        case STORE_USER:
            return {
                ...state,
                user: { ...payload.user },
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null,
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
        default:
            return state;
    }
};
