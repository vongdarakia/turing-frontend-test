import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { incrementItemInCart, decrementItemInCart } from '../Cart/duck/actions';
import {
    registerAccount,
    login,
    getCustomer,
    logOut,
    loginWithFacebook,
} from './duck/actions';
import { KEY_TOKEN } from '../../../api/config';
import getCartLineItemsFromTable from '../../../utils/get-cart-line-items';
import LoginModal from '../Login/LoginModal';
import RegisterModal from '../Register/RegisterModal';
import CheckoutModal from '../Checkout/CheckoutModal';
import UserHeader from './UserHeader';
import ShopmateHeader from './ShopmateHeader';
import CategoryList from './CategoryList';
import ProductList from './ProductList';
import ProductDetailModal from '../ProductDetail/ProductDetailModal';

const Wrapper = styled.div`
    .main-content {
        display: flex;
        padding: 18px;
    }

    .category-list {
        max-width: 160px;
        width: fit-content;
    }
`;

class Home extends Component {
    componentDidMount = async () => {
        const token = window.localStorage[KEY_TOKEN];
        const { loadUser } = this.props;

        if (token) {
            loadUser();
        }
    };

    render() {
        return (
            <Wrapper>
                <LoginModal />
                <RegisterModal />
                <CheckoutModal />
                <ProductDetailModal />

                <UserHeader />
                <ShopmateHeader />

                <div className="main-content">
                    <CategoryList />
                    <ProductList />
                </div>
            </Wrapper>
        );
    }
}

Home.propTypes = {
    loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    cart: getCartLineItemsFromTable(state.cart),
    user: state.main.user,
});

const mapDispatchToProps = {
    incrementItemInCart,
    decrementItemInCart,
    loadUser: getCustomer,
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
)(Home);
