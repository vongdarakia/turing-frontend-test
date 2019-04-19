import React from 'react';
import ProductCard from '../../common/ProductCard';

const ProductListComponent = (props) => {
    const { products, totalProducts } = props;

    return (
        <div>
            {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
            ))}
        </div>
    );
};

export default ProductListComponent;
