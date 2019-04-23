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
import LoginModal from '../Login/LoginModal';
import RegisterModal from '../Register/RegisterModal';
import Modal from '../../common/Modal';
import Checkout from '../Checkout';
import CheckoutModal from '../Checkout/CheckoutModal';
import UserHeader from './UserHeader';
import ShopmateHeader from './ShopmateHeader';

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

    render() {
        const {
            isRegisterModalOpen,
            isLoginModalOpen,
            isCheckoutModalOpen,
        } = this.state;

        return (
            <div>
                <LoginModal />
                <RegisterModal />
                <CheckoutModal />

                <UserHeader />
                <ShopmateHeader />

                <button type="button" onClick={this.openCheckoutModal}>
                    Checkout
                </button>
                <div>
                    <button type="button" onClick={this.openRegisterModal}>
                        Register
                    </button>
                    <button type="button" onClick={this.openLoginModal}>
                        Login
                    </button>
                </div>
            </div>
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
