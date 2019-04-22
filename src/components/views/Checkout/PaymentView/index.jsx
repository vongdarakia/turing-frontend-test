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

        const { goToPreviousStage } = props;

        this.state = {
            shippingOptions: [],
            btnPropsPrimary: {
                onClick: this.handleCheckout,
            },
            btnPropsSecondary: {
                onClick: goToPreviousStage,
            },
        };
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
        const { className } = this.props;
        const { btnPropsPrimary, btnPropsSecondary } = this.state;

        return (
            <div className={className}>
                <PaymentViewComponent onCheckout={this.handleCheckout} />
                <ViewFooter
                    labelPrimary="Next Step"
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
});

export default compose(
    connect(mapStateToProps),
    injectStripe,
)(PaymentView);
