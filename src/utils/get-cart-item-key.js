import nanomemoize from 'nano-memoize';
import objectIsSame from './object-is-same';

const getCartItemKey = nanomemoize(({ name, attributes }) => {
    return `${name}-${attributes}`;
}, objectIsSame);

export default getCartItemKey;
