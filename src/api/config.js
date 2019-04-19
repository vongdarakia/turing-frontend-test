export const KEY_TOKEN = 'vongdara-turing-token';
export const apiUrl = 'https://backendapi.turing.com';

export const getBasicHeaders = () => {
    return new Headers({
        'Content-Type': 'application/json',
    });
};

export const getAuthHeaders = () => {
    const token = window.localStorage.getItem(KEY_TOKEN);

    return new Headers({
        'Content-Type': 'application/json',
        Authorization: token,
        'user-key': token,
    });
};
