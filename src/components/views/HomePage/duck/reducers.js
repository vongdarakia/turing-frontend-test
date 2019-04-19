import { STORE_USER, CLEAR_USER } from './types';

const user = null;

export default (state = user, { type, payload } = {}) => {
    switch (type) {
        case STORE_USER:
            return {
                ...state,
                ...payload.user,
            };
        case CLEAR_USER:
            return null;
        default:
            return state;
    }
};
