import React from 'react';
import styled from 'styled-components';
import ProductCard from '../../../common/ProductCard';

const Wrapper = styled.div`
    flex: 1;

    .product-list-pagination {
        display: flex;
        justify-content: center;

        .page-number {
            padding: 8px;
            cursor: pointer;
        }
        .current-page {
            color: red;
        }
    }

    .product-list {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        grid-gap: 1em;
        margin: 1em 0 3em;

        .product-card {
            margin: 12px 4px 0;
        }
    }
`;

const ProductListComponent = (props) => {
    const {
        products,
        totalProducts,
        className,
        page,
        pageLimit = 20,
        onChangePage,
    } = props;
    const numPages = Math.ceil(totalProducts / pageLimit);
    const pages = [];

    if (numPages > 1) {
        for (let index = 1; index <= numPages; index += 1) {
            pages.push(
                <button
                    type="button"
                    key={`page-${index}`}
                    className={`page-number ${
                        page === index ? 'current-page' : ''
                    }`}
                    onClick={() => {
                        onChangePage(index);
                    }}
                >
                    {index}
                </button>,
            );
        }
    }
    return (
        <Wrapper className={`product-list-container ${className || ''}`}>
            <div className="product-list-pagination">{pages}</div>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                ))}
            </div>
        </Wrapper>
    );
};

export default ProductListComponent;
