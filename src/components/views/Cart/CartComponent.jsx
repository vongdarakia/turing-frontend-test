import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import getItemImageUrlByName from '../../../utils/get-item-image-url';

const Wrapper = styled.div`
    padding-top: 24px;
    padding-bottom: 24px;

    hr {
        border: none;
        height: 2px;
        background-color: #e4e4e4;
    }

    .cart-empty {
        text-align: center;
    }

    .line-item {
        display: flex;
        flex-direction: row;
        padding: 12px 0;
        font-weight: 300;

        .col-line-item {
            text-align: center;
            display: flex;
            align-items: center;
        }

        .col-item {
            display: flex;
            flex: 1;
            text-align: left;
        }

        .col-attributes {
            max-width: 128px;
            width: 100%;
        }

        .col-quantity {
            max-width: 192px;
            width: 100%;
            justify-content: center;
        }

        .col-price {
            max-width: 96px;
            width: 100%;
            justify-content: flex-end;
        }

        .col-price-value {
            font-size: 20px;
            color: #2e2e2e;
            font-weight: bold;
        }
    }

    .row-item-header {
        color: #b4b4b4;
        font-weight: bold;
        padding-bottom: 0;
    }

    .btn-quantity {
        font-size: 24px !important;
        width: 32px !important;
        height: 32px !important;
        min-height: unset !important;
        color: #2e2e2e !important;
        box-shadow: unset !important;
        margin: 0 4px;
        background-color: #e7e7e7 !important;

        .icon {
            font-size: 22px !important;
        }
    }
    .quantity-box {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 32px;
        width: 32px;
        font-weight: 700;
        color: #2e2e2e;
        border: 1px solid #b7b7b7;
    }

    .item {
        display: flex;
        flex-direction: row;
    }
    .item-image {
        width: 80px;
        height: 80px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    .item-info {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .item-name {
            margin: 0;
        }

        .btn-remove {
            font-size: 12px;
            display: flex;
            align-items: center;
            color: #b7b7b7;

            :hover {
                cursor: pointer;
                text-decoration: underline;
            }

            .icon {
                font-size: 12px !important;
                font-weight: bold;
                color: red;
                margin-right: 4px;
            }
        }
    }
`;

class CartComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const {
            cart = [],
            onRemoveItemFromCart,
            onRemoveItem,
            onAddItem,
        } = this.props;

        if (cart.length === 0) {
            return (
                <Wrapper className="section-cart checkout-view">
                    <h1 className="cart-title cart-empty">Empty Cart</h1>
                </Wrapper>
            );
        }

        return (
            <Wrapper className="section-cart checkout-view">
                <h2 className="cart-title">{cart.length} Items In Your Cart</h2>
                <div className="line-item row-item-header">
                    <div className="col-line-item col-item">Item</div>
                    <div className="col-line-item col-attributes">
                        Attributes
                    </div>
                    <div className="col-line-item col-quantity">Quantity</div>
                    <div className="col-line-item col-price">Price</div>
                </div>
                <hr />
                {cart.map((lineItem) => (
                    <div key={lineItem.name} className="line-item">
                        <div className="col-line-item col-item">
                            <div className="item">
                                <div className="item-image">
                                    <img
                                        src={getItemImageUrlByName(
                                            lineItem.name,
                                        )}
                                        alt={lineItem.name}
                                    />
                                </div>
                                <div className="item-info">
                                    <h3 className="item-name">
                                        {lineItem.name}
                                    </h3>
                                    <div
                                        className="btn-remove"
                                        onClick={() => {
                                            onRemoveItemFromCart(lineItem.name);
                                        }}
                                    >
                                        <Icon className="icon">clear_icon</Icon>
                                        Remove
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-line-item col-attributes">
                            {lineItem.attributes}
                        </div>
                        <div className="col-line-item col-quantity">
                            <Fab
                                aria-label="Remove"
                                className="btn-quantity"
                                size="small"
                                onClick={() => onRemoveItem(lineItem.name)}
                            >
                                <Icon className="icon">remove_icon</Icon>
                            </Fab>
                            <div className="quantity-box">
                                {lineItem.quantity}
                            </div>
                            <Fab
                                aria-label="Add"
                                className="btn-quantity"
                                size="small"
                                onClick={() => onAddItem(lineItem.name)}
                            >
                                <Icon className="icon">add_icon</Icon>
                            </Fab>
                        </div>
                        <div className="col-line-item col-price col-price-value">
                            {`$${(lineItem.price * lineItem.quantity).toFixed(
                                2,
                            )}`}
                        </div>
                    </div>
                ))}
            </Wrapper>
        );
    }
}

CartComponent.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.string,
            quantity: PropTypes.number,
            attributes: PropTypes.string,
        }),
    ),
    onRemoveItemFromCart: PropTypes.func.isRequired,
    onRemoveItem: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
};

CartComponent.defaultProps = {
    cart: [],
};

export default CartComponent;
