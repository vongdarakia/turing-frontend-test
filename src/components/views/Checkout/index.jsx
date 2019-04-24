import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StripeProvider, Elements } from 'react-stripe-elements';

import DeliveryView from './DeliveryView';
import ConfirmationView from './ConfirmationView';
import PaymentView from './PaymentView';
import SuccessView from './SuccessView';
import Cart from '../Cart';
import { clearCart as clearCartAction } from '../Cart/duck/actions';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stage: 0,
        };
    }

    goToNextStage = () => {
        const { stage } = this.state;

        this.setState({ stage: stage + 1 });
    };

    goToPreviousStage = () => {
        const { stage } = this.state;
        let prevStage = stage - 1;

        if (prevStage < 0) {
            prevStage = 0;
        }

        this.setState({ stage: prevStage });
    };

    handlePaymentFailure = (error) => {
        console.error(error);
    };

    renderCartView = () => {
        return <Cart onClickNext={this.goToNextStage} />;
    };

    renderDeliveryView = () => {
        return (
            <DeliveryView
                onClickNext={this.goToNextStage}
                onClickBack={this.goToPreviousStage}
            />
        );
    };

    renderConfirmationView = () => {
        return (
            <ConfirmationView
                onClickPay={this.goToNextStage}
                onClickBack={this.goToPreviousStage}
            />
        );
    };

    renderPaymentView = () => {
        const { clearCart } = this.props;
        return (
            <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
                <Elements>
                    <PaymentView
                        onFailure={this.handlePaymentFailure}
                        onSuccess={() => {
                            clearCart();
                            this.goToNextStage();
                        }}
                        onClickBack={this.goToPreviousStage}
                    />
                </Elements>
            </StripeProvider>
        );
    };

    renderSuccessView = () => {
        return <SuccessView />;
    };

    render() {
        const { stage } = this.state;

        if (stage === 1) {
            return this.renderDeliveryView();
        }
        if (stage === 2) {
            return this.renderConfirmationView();
        }
        if (stage === 3) {
            return this.renderPaymentView();
        }
        if (stage === 4) {
            return this.renderSuccessView();
        }

        return this.renderCartView();
    }
}

Checkout.propTypes = {
    clearCart: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    clearCart: clearCartAction,
};

export default connect(
    undefined,
    mapDispatchToProps,
)(Checkout);
