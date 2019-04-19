import categories from './categories';
import customers from './customers';
import departments from './departments';
import products from './products';

const TuringAPI = {
    ...categories,
    ...customers,
    ...departments,
    ...products,
};

export default TuringAPI;
