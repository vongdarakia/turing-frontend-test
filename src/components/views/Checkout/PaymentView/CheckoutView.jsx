import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectStripe, CardElement } from 'react-stripe-elements';
import TuringAPI from '../../../../api';

const stripeCardStyle = {
    // display: 'flex',
    // padding: '0 15px',
    // base: {
    //     fontWeight: 500,
    //     fontFamily: 'Roboto, sans-serif',
    //     fontSize: '14px',
    //     fontSmoothing: 'antialiased',
    //     '::placeholder': {
    //         color: '#aaaaaa',
    //     },
    // },

    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4',
        },
    },
    invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
    },
};

const Wrapper = styled.div`
    width: 400px;

    .StripeElement {
        box-sizing: border-box;

        height: 40px;

        padding: 10px 12px;

        border: 1px solid transparent;
        border-radius: 4px;
        background-color: white;

        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
        border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
    }
`;

class CheckoutView extends Component {
    constructor(props) {
        super(props);
    }

    handleCheckout = async (e) => {
        e.preventDefault();
        const { stripe, user } = this.props;

        try {
            const { token, error } = await stripe.createToken({
                name: user.name,
                address_line1: '91 Rosemary Drive',
                address_city: '',
                address_state: '',
                address_zip: '',
                address_country: '',
            });
            console.log({ token, user, error });

            const cart_id = await TuringAPI.getCartId();
            let cart = await TuringAPI.addItemToCart({
                cart_id,
                product_id: 2,
                attributes: [],
            });

            cart = await TuringAPI.addItemToCart({
                cart_id,
                product_id: 4,
                attributes: [],
            });
            // const taxes = await TuringAPI.getAllTaxes();
            // const regions = await TuringAPI.getAllShippingRegions();
            // const shipping = await TuringAPI.getShippingOptionsByRegionId({
            //     shipping_region_id: 3,
            // });

            const customer = await TuringAPI.getCustomer();

            // console.log({ taxes, regions, shipping });

            const { orderId } = await TuringAPI.createOrder({
                cart_id,
                customer_id: customer.customer_id,
                shipping_id: 1,
                tax_id: 1,
            });

            const order = await TuringAPI.getShortDetailOrder({
                order_id: orderId,
            });
            console.log(order);
            const result = await TuringAPI.stripeCharge({
                stripeToken: token.id,
                order_id: orderId,
                amount: parseFloat(order.total_amount) * 100,
                description: `Ordered on ${order.created_on}`,
            });

            console.log(result);
        } catch (err) {
            console.error(err);
        }
    };

    render() {
        return (
            <Wrapper>
                <CardElement style={stripeCardStyle} />
                <button type="submit" onClick={this.handleCheckout}>
                    Checkout
                </button>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.main.user,
});

export default compose(
    connect(mapStateToProps),
    injectStripe,
)(CheckoutView);
