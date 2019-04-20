import React from 'react';

const ProductDetailComponent = (props) => {
    const {
        product: {
            name,
            description,
            price,
            discounted_price,
            image,
            image2,
        } = {},
        onAddToCart,
    } = props;
    return (
        <div>
            <div>name: {name}</div>
            <div>description: {description}</div>
            <div>price: {price}</div>
            <div>discounted price: {discounted_price}</div>
            <div>img1: {image}</div>
            <div>img2: {image2}</div>
            <button onClick={onAddToCart}>Add to cart</button>
        </div>
    );
};

export default ProductDetailComponent;
