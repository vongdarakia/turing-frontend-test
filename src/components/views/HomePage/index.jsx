import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import HomeComponent from './HomeComponent';
import { incrementItemInCart, decrementItemInCart } from '../Cart/duck/actions';
import { registerAccount, login, getCustomer, logOut } from './duck/actions';
import { KEY_TOKEN } from '../../../api/config';
import TuringAPI from '../../../api';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegisterModalOpen: false,
            isLoginModalOpen: false,
            products: [],
            totalProducts: 0,
        };
    }

    componentDidMount = async () => {
        const token = window.localStorage[KEY_TOKEN];
        const { fetchUser } = this.props;

        if (token) {
            fetchUser();
        }

        const { products, count } = await TuringAPI.getAllProducts();
        this.setState({
            products,
            totalProducts: count,
        });
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

    render() {
        const {
            isRegisterModalOpen,
            isLoginModalOpen,
            products,
            totalProducts,
        } = this.state;

        return (
            <HomeComponent
                {...this.props}
                isRegisterModalOpen={isRegisterModalOpen}
                onRegister={this.handleRegister}
                onOpenRegisterModal={this.openRegisterModal}
                onCloseRegisterModal={this.closeRegisterModal}
                onLogin={this.handleLogin}
                isLoginModalOpen={isLoginModalOpen}
                onCloseLoginModal={this.closeLoginModal}
                onOpenLoginModal={this.openLoginModal}
                products={products}
                totalProducts={totalProducts}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    cart: Object.keys(state.cart).map((key) => state.cart[key]),
    user: state.user,
});

const mapDispatchToProps = {
    incrementItemInCart,
    decrementItemInCart,
    fetchUser: getCustomer,
    onRegister: registerAccount,
    onLogin: login,
    onLogOut: logOut,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    // withRouter,
)(HomePage);
