import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ProductRating from './ProductRating';
import ProductCategories from './ProductCategories';
import ProductColors from './ProductColors';
import ProductSizes from './ProductSizes';
import Button from '../../common/Button';

import getProductImageUrl from '../../../utils/get-product-image-url';
import { PRIMARY_COLOR, SECONDARY_FONT_FAMILY } from '../../../styles/settings';

const Wrapper = styled.div`
    background-color: white;
    padding: 36px 18px;
    display: flex;

    .product-name {
        margin: 0;
    }

    .product-description {
        margin: 12px 0;
    }

    .product-price {
        font-family: ${SECONDARY_FONT_FAMILY};
        color: ${PRIMARY_COLOR};
        font-size: 24px;
        font-weight: bold;
        margin: 24px 0;
    }

    .product-discounted-price {
        color: #b4b4b4;
        text-decoration: line-through;
        font-size: 12px;
    }

    .product-rating {
        margin: 12px 0 4px;
    }

    .product-sizes {
        margin-top: 12px;
    }

    .section-product-image {
        width: 33%;
        display: flex;
        padding-right: 18px;
        justify-content: center;
        align-items: flex-start;
        box-sizing: border-box;

        .product-image {
            width: 90%;
            object-fit: contain;
        }
    }

    .section-product-info {
        flex: 1;
    }

    #btn-add-to-cart {
        margin-top: 20px;
    }
`;

const ProductDetailComponent = (props) => {
    const {
        loading,
        product: { name, description, price, discounted_price } = {},
        product,
        rating,
        categories = [],
        onClickAddToCart,
        selectedDepartment,
        colorAttributes,
        selectedColorAttribute: { attribute_value: selectedColor = '' } = {},
        selectedColorAttribute,
        sizeAttributes,
        selectedSizeAttribute: { attribute_value: selectedSize = '' } = {},
        selectedSizeAttribute,
        onClickColor,
        onClickSize,
    } = props;

    if (loading) {
        return null;
    }
    const canAdd = selectedColor && selectedSize;
    const hasDiscount = parseFloat(discounted_price) > 0;
    const currPrice = hasDiscount ? discounted_price : price;
    const prevPrice = price;

    return (
        <Wrapper className="product-detail-container">
            <div className="section-product-image">
                <img
                    className="product-image"
                    src={getProductImageUrl(product || {})}
                    alt={name}
                />
            </div>

            <div className="section-product-info">
                <ProductCategories
                    categories={categories}
                    selectedDepartment={selectedDepartment}
                />
                <ProductRating rating={rating} />
                <h2 className="product-name">{name}</h2>
                <div className="product-description">{description}</div>
                <div className="product-price">
                    {`$${currPrice}`}{' '}
                    <span className="product-discounted-price">
                        {hasDiscount ? prevPrice : ''}
                    </span>
                </div>
                <ProductColors
                    colorAttributes={colorAttributes}
                    selectedColorAttribute={selectedColorAttribute}
                    onClickColor={onClickColor}
                />
                <ProductSizes
                    sizeAttributes={sizeAttributes}
                    selectedSizeAttribute={selectedSizeAttribute}
                    onClickSize={onClickSize}
                />
                <Button
                    id="btn-add-to-cart"
                    className="primary btn-large"
                    onClick={onClickAddToCart}
                    disabled={!canAdd}
                >
                    Add to cart
                </Button>
            </div>
        </Wrapper>
    );
};

ProductDetailComponent.propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.shape({
        product_id: PropTypes.number,
        name: PropTypes.string,
    }),
    rating: PropTypes.number.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    colorAttributes: PropTypes.arrayOf(
        PropTypes.shape({
            attribute_value: PropTypes.string,
            attribute_value_id: PropTypes.number,
        }),
    ).isRequired,
    sizeAttributes: PropTypes.arrayOf(
        PropTypes.shape({
            attribute_value: PropTypes.string,
            attribute_value_id: PropTypes.number,
        }),
    ).isRequired,
    selectedDepartment: PropTypes.string,
    selectedColorAttribute: PropTypes.shape({
        attribute_value: PropTypes.string,
        attribute_value_id: PropTypes.number,
    }).isRequired,
    selectedSizeAttribute: PropTypes.shape({
        attribute_value: PropTypes.string,
        attribute_value_id: PropTypes.number,
    }).isRequired,
    onClickAddToCart: PropTypes.func.isRequired,
    onClickColor: PropTypes.func.isRequired,
    onClickSize: PropTypes.func.isRequired,
};

ProductDetailComponent.defaultProps = {
    product: undefined,
    selectedDepartment: undefined,
};

export default ProductDetailComponent;
