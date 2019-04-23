import nanomemoize from 'nano-memoize';

const isValidPassword = nanomemoize((password1, password2) => {
    return password1 && password2 && password1 === password2;
});

export default isValidPassword;
