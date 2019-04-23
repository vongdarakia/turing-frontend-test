import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.svg';
import './App.css';
import {
    incrementItemInCart,
    decrementItemInCart,
    storeCart,
} from './components/views/Cart/duck/actions';
import Routes from './routes';
import history from './routes/history';
import {
    loginWithFacebook,
    storeDepartments as storeDepartmentsAction,
    storeCategories as storeCategoriesAction,
} from './components/views/HomePage/duck/actions';
import { KEY_TOKEN } from './api/config';
import TuringAPI from './api';
import { KEY_CART_ID } from './components/views/Cart/duck/types';
import DeliveryView from './components/views/Checkout/DeliveryView';
import Checkout from './components/views/Checkout';
import MainStyles from './styles/MainStyle';

class App extends Component {
    componentDidMount = async () => {
        const {
            user,
            saveCart,
            storeDepartments,
            storeCategories,
        } = this.props;
        const cart_id = await TuringAPI.getCartId();

        // const cart = await TuringAPI.addItemToCart({
        //     cart_id,
        //     product_id: 2,
        //     attributes: [],
        // });

        await TuringAPI.addItemToCart({
            cart_id,
            product_id: 1,
            attributes: [],
        });

        const product = await TuringAPI.getProductDetails({ product_id: 1 });
        const cart = await TuringAPI.getCart();

        saveCart(cart);

        console.log({ cart, product });

        // TuringAPI.updateItemInCart({
        //     item_id: cart[1].item_id,
        //     quantity: 5,
        // });

        // const taxes = await TuringAPI.getAllTaxes();
        const regions = await TuringAPI.getAllShippingRegions();
        const shipping = await TuringAPI.getShippingOptionsByRegionId({
            shipping_region_id: 2,
        });

        const customer = await TuringAPI.getCustomer();

        const departments = await TuringAPI.getAllDepartments();
        const { categories } = await TuringAPI.getAllCategories();

        storeDepartments(departments);
        storeCategories(categories);

        console.log({ regions, shipping });

        // const { orderId } = await TuringAPI.createOrder({
        //     cart_id,
        //     customer_id: customer.customer_id,
        //     shipping_id: 1,
        //     tax_id: 1,
        // });

        // const order = await TuringAPI.getOrderById({
        //     order_id: orderId,
        // });

        // const summary = await TuringAPI.getShortDetailOrder({
        //     order_id: orderId,
        // });
        // order id 948

        // console.log({ order, summary });
    };

    handleFacebookLogin = ({ accessToken } = {}) => {
        this.props.onLoginWithFacebook({ accessToken });
    };

    renderFacebookAutoLogin = () => {
        if (!window.localStorage[KEY_TOKEN]) {
            return (
                <FacebookLogin
                    appId="352854622106208"
                    autoLoad
                    cssClass="facebook-auto-login"
                    callback={this.handleFacebookLogin}
                />
            );
        }
        return null;
    };

    render() {
        console.log(this.props);
        return (
            <MainStyles className="App">
                <Router history={history}>
                    <Routes />
                </Router>
            </MainStyles>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.main.user,
});

const mapDispatchToProps = {
    onLoginWithFacebook: loginWithFacebook,
    saveCart: storeCart,
    storeDepartments: storeDepartmentsAction,
    storeCategories: storeCategoriesAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
