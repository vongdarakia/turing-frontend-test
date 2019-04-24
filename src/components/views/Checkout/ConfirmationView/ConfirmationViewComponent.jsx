import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PRIMARY_COLOR } from '../../../../styles/settings';

const Wrapper = styled.div`
    padding-top: 48px;

    hr {
        border: none;
        margin-top: 48px;
        margin-bottom: 16px;
        height: 2px;
        background-color: #e4e4e4;
        width: calc(100% - 36px);
    }

    .summary-header {
        padding: 0 18px;
    }

    .row-summary,
    .row-cost {
        display: flex;
        flex-direction: row;
    }

    .section-order-summary {
        padding-right: 48px;
    }

    .section-order-summary,
    .section-sub-total {
        width: 60%;
        box-sizing: border-box;
    }

    .section-delivery-summary,
    .section-grand-total {
        width: 40%;
        box-sizing: border-box;
    }

    .section-sub-total {
        display: flex;
        justify-content: flex-end;
    }

    .section-grand-total {
        .col-fee-summary {
            width: fit-content;
            .sub-header {
                font-size: 20px;
            }
        }
    }

    .section-cart-summary {
        display: flex;
        flex-direction: column;

        .line-item:nth-child(even) {
            background-color: #f7f7f7;
        }
    }

    .section-address,
    .section-delivery-option {
        padding: 6px 18px;
    }

    .line-item {
        display: flex;
        flex-direction: row;
        padding: 12px 18px;
        font-weight: 300;

        .col-line-item {
            text-align: center;
            padding: 0 4px;
        }

        .col-item {
            display: flex;
            flex: 1;
            text-align: left;
        }

        .col-qty {
            width: 64px;
        }

        .col-price {
            width: 64px;
        }

        .col-price-value {
            color: ${PRIMARY_COLOR};
            font-weight: bold;
        }
    }

    .row-item-header {
        color: #b4b4b4;
        font-weight: bold;
    }

    .row-cost {
        margin-bottom: 24px;

        .row-item-header {
            padding: 6px 18px;
        }
        .col-fee-summary {
            text-align: left;
            .sub-header {
                padding-left: 18px;
            }
        }
    }
`;

const ConfirmationViewComponent = (props) => {
    const {
        address,
        city,
        state,
        zipCode,
        country,
        shippingOption,
        cart,
        subtotal,
        grandTotal,
    } = props;

    return (
        <Wrapper id="confirmation-view" className="checkout-view">
            <div className="row-summary">
                <div className="section-order-summary">
                    <div className="sub-header summary-header">
                        Order Summary
                    </div>
                    <div className="section-cart-summary">
                        <div className="line-item row-item-header">
                            <div className="col-line-item col-item">Item</div>
                            <div className="col-line-item col-qty">Qty</div>
                            <div className="col-line-item col-price">Price</div>
                        </div>
                        {cart.map((lineItem) => (
                            <div key={lineItem.name} className="line-item">
                                <div className="col-line-item col-item">
                                    {lineItem.name}
                                </div>
                                <div className="col-line-item col-qty">
                                    {lineItem.quantity}
                                </div>
                                <div className="col-line-item col-price col-price-value">
                                    {`$${lineItem.subtotal}`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="section-delivery-summary">
                    <div className="sub-header summary-header">Delivery</div>
                    <div className="line-item row-item-header">
                        <div className="col-line-item">Address</div>
                    </div>

                    <div className="section-address">
                        <div>{address}</div>
                        <div>
                            {city}
                            {state ? `, ${state}` : ''}
                            {zipCode ? `, ${zipCode}` : ''}
                        </div>
                        <div>{country}</div>
                    </div>

                    <div className="line-item row-item-header">
                        <div className="col-line-item">Delivery option</div>
                    </div>

                    <div className="section-delivery-option">
                        {shippingOption.shipping_type}
                    </div>
                </div>
                <div />
            </div>

            <hr />

            <div className="row-cost">
                <div className="section-sub-total">
                    <div className="col-fee-summary">
                        <div className="line-item row-item-header">
                            Sub total
                        </div>
                        <div className="sub-header">{`$${subtotal}`}</div>
                    </div>

                    <div className="col-fee-summary">
                        <div className="line-item row-item-header">
                            Shipping fee
                        </div>
                        <div className="sub-header">
                            {shippingOption.shipping_cost
                                ? `$${shippingOption.shipping_cost}`
                                : 'free'}
                        </div>
                    </div>
                </div>

                <div className="section-grand-total">
                    <div className="col-fee-summary">
                        <div className="line-item row-item-header">
                            Grand total
                        </div>
                        <div className="sub-header">{`$${grandTotal}`}</div>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

ConfirmationViewComponent.propTypes = {
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    shippingOption: PropTypes.shape({
        shipping_id: PropTypes.number,
        shipping_type: PropTypes.string,
    }).isRequired,
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            quantity: PropTypes.number,
            sub_total: PropTypes.number,
        }),
    ).isRequired,
    subtotal: PropTypes.string.isRequired,
    grandTotal: PropTypes.string.isRequired,
};

export default ConfirmationViewComponent;
