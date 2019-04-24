import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

import getProductImageUrl from '../../../utils/get-product-image-url';
import Button from '../Button';

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    padding: 16px;
    position: relative;
    width: 100%;
    height: 240px;
    min-width: 160px;
    max-width: 180px;
    box-sizing: border-box;

    .section-product {
        text-align: center;

        .product-image-container {
            width: 100%;
            max-width: 120px;
            margin: auto;

            img {
                width: 100%;
                object-fit: contain;
            }
        }

        .product-name {
            margin: 12px 0;
            line-height: normal;
        }

        .section-price {
            display: flex;
            justify-content: center;
            font-weight: 600;

            &.has-discount {
                justify-content: space-between;
            }

            .product-price {
                color: #f62f5e;
            }

            .product-discounted-price {
                text-decoration: line-through;
                display: flex;
                justify-content: flex-end;
            }
        }
    }

    .quick-view-background,
    .quick-view-cover {
        border-radius: inherit;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        transition: opacity 200ms;

        &.hide {
            opacity: 0;
        }
    }

    .quick-view-background {
        background-color: white;
        opacity: 0.8;
    }

    .quick-view-cover {
        opacity: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-quick-view {
        font-size: 12px !important;
        padding: 6px 16px !important;
        min-width: unset !important;
    }
`;

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elevation: 1,
            mouseOver: false,
        };
    }

    handleMouseOver = () => {
        this.setState({ elevation: 10, mouseOver: true });
    };

    handleMouseOut = () => {
        this.setState({ elevation: 1, mouseOver: false });
    };

    render() {
        const {
            product: { name, price, discounted_price } = {},
            product,
        } = this.props;
        const { elevation, mouseOver } = this.state;
        const discountedPriceValue = parseFloat(discounted_price);
        const hasDiscount =
            !Number.isNaN(discountedPriceValue) && discountedPriceValue > 0;
        const prevPrice = price;
        let currPrice = price;

        if (hasDiscount) {
            currPrice = discounted_price;
        }

        return (
            <StyledPaper
                elevation={elevation}
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseOut}
                className="product-card"
            >
                <div className="section-product">
                    <div className="product-image-container">
                        <img src={getProductImageUrl(product)} alt={name} />
                    </div>
                    <div className="sub-header product-name">{name}</div>
                    <div
                        className={`section-price ${
                            hasDiscount ? 'has-discount' : ''
                        }`}
                    >
                        {hasDiscount && (
                            <div className="product-discounted-price">{`$${prevPrice}`}</div>
                        )}
                        <div className="product-price">{`$${currPrice}`}</div>
                    </div>
                </div>
                <div
                    className={`quick-view-background ${
                        mouseOver ? '' : 'hide'
                    }`}
                />
                <div className={`quick-view-cover ${mouseOver ? '' : 'hide'}`}>
                    <Button className="primary btn-quick-view">
                        Quick View
                    </Button>
                </div>
            </StyledPaper>
        );
    }
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        product_id: PropTypes.number,
        price: PropTypes.string,
        discounted_price: PropTypes.string,
    }).isRequired,
};

export default ProductCard;
