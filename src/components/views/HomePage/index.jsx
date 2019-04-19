import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import HomeComponent from './HomeComponent';
import { incrementItemInCart, decrementItemInCart } from '../Cart/duck/actions';
import { registerAccount } from './duck/actions';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegisterModalOpen: false,
        };
    }

    openRegisterModal = () => {
        this.setState({
            isRegisterModalOpen: true,
        });
    };

    closeRegisterModal = () => {
        this.setState({
            isRegisterModalOpen: false,
        });
    };

    handleRegister = async ({ name, email, password }) => {
        const { onRegister } = this.props;
        const response = await onRegister({ name, email, password });

        if (response.customer) {
            this.closeRegisterModal();
        }
    };

    render() {
        const { isRegisterModalOpen } = this.state;

        return (
            <HomeComponent
                {...this.props}
                isRegisterModalOpen={isRegisterModalOpen}
                onRegister={this.handleRegister}
                onOpenRegisterModal={this.openRegisterModal}
                onCloseRegisterModal={this.closeRegisterModal}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    cart: Object.keys(state.cart).map((key) => state.cart[key]),
});

const mapDispatchToProps = {
    incrementItemInCart,
    decrementItemInCart,
    onRegister: registerAccount,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    // withRouter,
)(HomePage);
