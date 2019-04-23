import React, { Component } from 'react';
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
import TuringAPI from '../../../api';
import getCartLineItemsFromTable from '../../../utils/get-cart-line-items';
import LoginModal from '../Login/LoginModal';
import RegisterModal from '../Register/RegisterModal';
import CheckoutModal from '../Checkout/CheckoutModal';
import UserHeader from './UserHeader';
import ShopmateHeader from './ShopmateHeader';
import CategoryList from './CategoryList';
import ProductList from './ProductList';

const Wrapper = styled.div`
    .main-content {
        display: flex;
    }

    .category-list {
        max-width: 160px;
        width: fit-content;
    }
`;

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount = async () => {
        const token = window.localStorage[KEY_TOKEN];
        const { fetchUser } = this.props;

        if (token) {
            fetchUser();
        }
    };

    render() {
        return (
            <Wrapper>
                <LoginModal />
                <RegisterModal />
                <CheckoutModal />

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
