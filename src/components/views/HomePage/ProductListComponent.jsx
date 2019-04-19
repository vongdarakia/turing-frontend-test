/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styled from 'styled-components';
import ProductCard from '../../common/ProductCard';

const Wrapper = styled.div`
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
                <div
                    key={`page-${index}`}
                    className={`page-number ${
                        page === index ? 'current-page' : ''
                    }`}
                    onClick={() => {
                        onChangePage(index);
                    }}
                >
                    {index}
                </div>,
            );
        }
    }
    return (
        <Wrapper className={className}>
            <div className="product-list-pagination">{pages}</div>
            {products.map((product) => (
                <ProductCard key={product.product_id} product={product} />
            ))}
        </Wrapper>
    );
};

export default ProductListComponent;
