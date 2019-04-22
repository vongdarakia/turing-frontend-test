import React, { Component } from 'react';

import DeliveryView from './DeliveryView';
import ConfirmationView from './ConfirmationView';

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

    renderPaymentView = () => {};

    renderSuccessView = () => {};

    render() {
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
    }
}

export default Checkout;
