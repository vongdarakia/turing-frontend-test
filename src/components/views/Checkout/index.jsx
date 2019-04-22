import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StripeProvider, Elements } from 'react-stripe-elements';

import DeliveryView from './DeliveryView';
import ConfirmationView from './ConfirmationView';
import PaymentView from './PaymentView';
import SuccessView from './SuccessView';

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

    renderDeliveryView = () => {
        return (
            <DeliveryView
                goToNextStage={this.goToNextStage}
                goToPreviousStage={this.goToPreviousStage}
            />
        );
    };

    renderConfirmationView = () => {
        return (
            <ConfirmationView
                goToNextStage={this.goToNextStage}
                goToPreviousStage={this.goToPreviousStage}
            />
        );
    };

    renderPaymentView = () => {
        return (
            <StripeProvider apiKey="pk_test_NcwpaplBCuTL6I0THD44heRe">
                <Elements>
                    <PaymentView
                        goToNextStage={this.goToNextStage}
                        goToPreviousStage={this.goToPreviousStage}
                    />
                </Elements>
            </StripeProvider>
        );
    };

    renderSuccessView = () => {
        const { onCloseModal } = this.props;

        return <SuccessView onCloseModal={onCloseModal} />;
    };

    getView = () => {
        const { stage } = this.state;

        if (stage === 1) {
            return this.renderConfirmationView();
        }
        if (stage === 2) {
            return this.renderPaymentView();
        }
        if (stage === 3) {
            return this.renderSuccessView();
        }

        return this.renderDeliveryView();
    };

    render() {
        return <Wrapper id="checkout-modal-view">{this.getView()}</Wrapper>;
    }
}

Checkout.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};

export default Checkout;
