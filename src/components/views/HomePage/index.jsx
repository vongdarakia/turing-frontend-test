import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import HomeComponent from './HomeComponent';
import { incrementItemInCart, decrementItemInCart } from '../Cart/duck/actions';
import {
    registerAccount,
    login,
    getCustomer,
    logOut,
    loginWithFacebook,
} from './duck/actions';
import { KEY_TOKEN } from '../../../api/config';
import TuringAPI from '../../../api';
import getCartLineItemsFromTable from '../../../utils/get-cart-line-items';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegisterModalOpen: false,
            isLoginModalOpen: false,
            isCheckoutModalOpen: false,
        };
    }

    componentDidMount = async () => {
        const token = window.localStorage[KEY_TOKEN];
        const { fetchUser } = this.props;

        if (token) {
            fetchUser();
        }
    };

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

    openLoginModal = () => {
        this.setState({
            isLoginModalOpen: true,
        });
    };

    closeLoginModal = () => {
        this.setState({
            isLoginModalOpen: false,
        });
    };

    openCheckoutModal = () => {
        this.setState({
            isCheckoutModalOpen: true,
        });
    };

    closeCheckoutModal = () => {
        this.setState({
            isCheckoutModalOpen: false,
        });
    };

    handleRegister = async ({ name, email, password }) => {
        const { onRegister } = this.props;
        const response = await onRegister({ name, email, password });

        if (response.customer) {
            this.closeRegisterModal();
        }
    };

    handleLogin = async ({ email, password }) => {
        const { onLogin } = this.props;
        const response = await onLogin({ email, password });

        if (response.user) {
            this.closeLoginModal();
        }
    };

    handleLoginWithFacebook = async ({ accessToken }) => {
        const { onLoginWithFacebook } = this.props;
        const response = await onLoginWithFacebook({ accessToken });
        console.log({ response });
        if (response.customer) {
            this.closeLoginModal();
        }
    };

    render() {
        const {
            isRegisterModalOpen,
            isLoginModalOpen,
            isCheckoutModalOpen,
        } = this.state;

        return (
            <HomeComponent
                {...this.props}
                isRegisterModalOpen={isRegisterModalOpen}
                onRegister={this.handleRegister}
                onOpenRegisterModal={this.openRegisterModal}
                onCloseRegisterModal={this.closeRegisterModal}
                onLogin={this.handleLogin}
                onLoginWithFacebook={this.handleLoginWithFacebook}
                isLoginModalOpen={isLoginModalOpen}
                onCloseLoginModal={this.closeLoginModal}
                onOpenLoginModal={this.openLoginModal}
                isCheckoutModalOpen={isCheckoutModalOpen}
                onCloseCheckoutModal={this.closeCheckoutModal}
                onOpenCheckoutModal={this.openCheckoutModal}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    cart: getCartLineItemsFromTable(state.cart),
    user: state.main.user,
});

const mapDispatchToProps = {
    incrementItemInCart,
    decrementItemInCart,
    fetchUser: getCustomer,
    onRegister: registerAccount,
    onLogin: login,
    onLoginWithFacebook: loginWithFacebook,
    onLogOut: logOut,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    // withRouter,
)(HomePage);
