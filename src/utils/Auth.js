import { KEY_TOKEN } from '../api/config';

const Auth = {
    isAuthenticated: () => {
        return !!window.localStorage[KEY_TOKEN];
    },
};

export default Auth;
