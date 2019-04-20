import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectStripe, CardElement } from 'react-stripe-elements';
import TuringAPI from '../../../api';

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
            // TuringAPI.stripeCharge({ stripeToken: token })
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
