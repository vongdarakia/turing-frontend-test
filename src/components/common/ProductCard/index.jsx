import React from 'react';

const ProductCard = (props) => {
    const { product: { name, product_id } = {} } = props;
    return <div>{name}</div>;
};

export default ProductCard;
