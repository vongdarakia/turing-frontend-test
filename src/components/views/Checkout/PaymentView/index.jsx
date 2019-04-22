import React, { Component } from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutView from './CheckoutView';

class PaymentView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <StripeProvider apiKey={'pk_test_NcwpaplBCuTL6I0THD44heRe'}>
                <Elements>
                    <CheckoutView {...this.props} />
                </Elements>
            </StripeProvider>
        );
    }
}

export default PaymentView;
