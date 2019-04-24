import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectStripe } from 'react-stripe-elements';

import PaymentViewComponent from './PaymentViewComponent';
import TuringAPI from '../../../../api';
import ViewFooter from '../../../common/ViewFooter';

class PaymentView extends Component {
    constructor(props) {
        super(props);

        const { onClickBack } = props;

        this.state = {
            btnPropsPrimary: {
                onClick: this.handleCheckout,
            },
            btnPropsSecondary: {
                onClick: onClickBack,
            },
        };
    }

    handleCheckout = async (e) => {
        e.preventDefault();
        const {
            stripe,
            onSuccess,
            onFailure,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            country,
            shippingOptionId,
        } = this.props;

        try {
            const { token, error } = await stripe.createToken({
                name: `${firstName} ${lastName}`.trim(),
                address_line1: address,
                address_city: city,
                address_state: state,
                address_zip: zipCode,
                address_country: country,
            });

            if (error) {
                throw new Error(error.message);
            }

            const cart_id = await TuringAPI.getCartId();
            const { orderId, error: orderError } = await TuringAPI.createOrder({
                cart_id,
                shipping_id: shippingOptionId,
                tax_id: 2,
            });

            if (orderError) {
                throw new Error(orderError.message);
            }

            const order = await TuringAPI.getShortDetailOrder({
                order_id: orderId,
            });
            const result = await TuringAPI.stripeCharge({
                stripeToken: token.id,
                order_id: orderId,
                amount: Math.floor(parseFloat(order.total_amount) * 100),
                description: `Ordered on ${order.created_on}`,
            });

            if (result.error) {
                onFailure(result.error);
                throw new Error(result.error.message);
            } else {
                onSuccess();
            }
        } catch (error) {
            if (error.message.includes('Unauthorized')) {
                this.setState({ error: 'Please log in to check out' });
            } else {
                this.setState({ error: error.message });
            }

            return { error };
        }
    };

    render() {
        const { className } = this.props;
        const { btnPropsPrimary, btnPropsSecondary, error } = this.state;

        return (
            <div className={className}>
                <PaymentViewComponent
                    onCheckout={this.handleCheckout}
                    error={error}
                />
                <ViewFooter
                    labelPrimary="Pay"
                    labelSecondary="Back"
                    btnPropsPrimary={btnPropsPrimary}
                    btnPropsSecondary={btnPropsSecondary}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.main.user,
    firstName: state.checkout.firstName,
    lastName: state.checkout.lastName,
    address: state.checkout.address,
    city: state.checkout.city,
    state: state.checkout.state,
    zipCode: state.checkout.zipCode,
    country: state.checkout.country,
    shippingOptionId: state.checkout.shippingOptionId,
});

export default compose(
    connect(mapStateToProps),
    injectStripe,
)(PaymentView);
