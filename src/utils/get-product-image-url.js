import nanomemoize from 'nano-memoize';
import objectIsSame from './object-is-same';

const getProductImageUrl = nanomemoize(
    (product) => {
        const { image, image_2, thumbnail, name } = product;

        if (thumbnail) {
            return `https://backendapi.turing.com/images/products/${thumbnail}`;
        }
        if (image) {
            return `https://backendapi.turing.com/images/products/${image}`;
        }
        if (image_2) {
            return `https://backendapi.turing.com/images/products/${image_2}`;
        }

        const cleanedName = name.replace(/[^a-zA-Z\d]/g, '-').toLowerCase();

        return `https://backendapi.turing.com/images/products/${cleanedName}.gif`;
    },
    { equals: objectIsSame },
);

export default getProductImageUrl;
