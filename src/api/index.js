import customers from './customers';
import products from './products';
import departments from './departments';

const TuringAPI = {
    ...customers,
    ...products,
    ...departments,
};

export default TuringAPI;
