import React from 'react';
import styled from 'styled-components';
import { CardElement } from 'react-stripe-elements';
import { PRIMARY_FONT_FAMILY } from '../../../../styles/settings';

const stripeCardStyle = {
    base: {
        color: '#32325d',
        fontFamily: `${PRIMARY_FONT_FAMILY}`,
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
    max-width: 500px;
    width: 100%;
    padding: 48px 18px;
    box-sizing: border-box;

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

    .error {
        color: #f44336;
    }
`;

const PaymentViewComponent = (props) => {
    const { error } = props;
    return (
        <Wrapper id="payment-view" className="checkout-view">
            <div className="sub-header">Enter your payment information</div>
            <CardElement style={stripeCardStyle} />
            {error && <small className="error">{error}</small>}
        </Wrapper>
    );
};

export default PaymentViewComponent;
