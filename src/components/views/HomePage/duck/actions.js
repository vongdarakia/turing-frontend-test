import { STORE_USER, CLEAR_USER } from './types';
import TuringAPI from '../../../../api';

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
        dispatch(storeUser({ user: response.customer }));
    }
    return response;
};
