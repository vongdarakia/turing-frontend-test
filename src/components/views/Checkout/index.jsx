import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StripeProvider, Elements } from 'react-stripe-elements';

import DeliveryView from './DeliveryView';
import ConfirmationView from './ConfirmationView';
import PaymentView from './PaymentView';
import SuccessView from './SuccessView';
import Cart from '../Cart';

const Wrapper = styled.div`
    .checkout-view,
    .view-footer-btn-container {
        max-width: 680px;
        margin: auto;
    }
`;

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
        const { onCloseModal } = this.props;

        return (
            <Cart
                onClickBackToShop={onCloseModal}
                onClickNext={this.goToNextStage}
            />
        );
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
        return (
            <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
                <Elements>
                    <PaymentView
                        onFailure={this.handlePaymentFailure}
                        onSuccess={this.goToNextStage}
                        onClickBack={this.goToPreviousStage}
                    />
                </Elements>
            </StripeProvider>
        );
    };

    renderSuccessView = () => {
        const { onCloseModal } = this.props;

        return <SuccessView onClickBackToShop={onCloseModal} />;
    };

    getView = () => {
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
    };

    render() {
        return <Wrapper id="checkout-modal-view">{this.getView()}</Wrapper>;
    }
}

Checkout.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};

export default Checkout;
