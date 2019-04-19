import { STORE_USER, CLEAR_USER } from './types';
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

    console.log(response);
    if (response.user) {
        console.log('storing token', { token: response.accessToken });
        window.localStorage[KEY_TOKEN] = response.accessToken;
        dispatch(storeUser({ user: response.user }));
    }
    return response;
};
