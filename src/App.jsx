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
} from './components/views/Cart/duck/actions';
import Routes from './routes';
import history from './routes/history';
import { loginWithFacebook } from './components/views/HomePage/duck/actions';
import { KEY_TOKEN } from './api/config';
import TuringAPI from './api';
import { KEY_CART_ID } from './components/views/Cart/duck/types';
import DeliveryView from './components/views/Checkout/DeliveryView';

const MainStyles = styled.div`
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    color: #6c6c6c;

    small {
        font-size: 12px;
    }

    h2 {
        font-family: 'Montserrat', sans-serif;
        font-size: 24px;
        color: #2e2e2e;
        line-height: 150%;
    }

    h3 {
        font-family: 'Montserrat', sans-serif;
        font-size: 16px;
        color: #2e2e2e;
        line-height: 150%;
    }

    .topbar {
        font-family: 'Montserrat', sans-serif;
        font-size: 15px;
        color: #2e2e2e;
        line-height: 240%;
    }

    .facebook-auto-login {
        display: none;
    }
`;

class App extends Component {
    componentDidMount = async () => {
        const { user } = this.props;
        const cart_id = await TuringAPI.getCartId();

        // const cart = await TuringAPI.addItemToCart({
        //     cart_id,
        //     product_id: 2,
        //     attributes: [],
        // });

        // await TuringAPI.addItemToCart({
        //     cart_id,
        //     product_id: 4,
        //     attributes: [],
        // });
        const cart = await TuringAPI.getCart();
        console.log(cart);

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

        console.log({ regions, shipping });

        const { orderId } = await TuringAPI.createOrder({
            cart_id,
            customer_id: customer.customer_id,
            shipping_id: 1,
            tax_id: 1,
        });

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
                <DeliveryView />
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {this.props.cart.map((lineItem) => {
                        return (
                            <div>
                                {lineItem.item.name} x {lineItem.amount}
                            </div>
                        );
                    })}
                    <button
                        onClick={() => {
                            console.log('clicking');
                            this.props.incrementItemInCart({
                                product_id: 'abc',
                                name: 'Shirt',
                            });
                        }}
                    >
                        Increment
                    </button>
                    <button
                        onClick={() => {
                            this.props.decrementItemInCart({
                                product_id: 'abc',
                                name: 'Shirt',
                            });
                        }}
                    >
                        Decrement
                    </button>
                </header> */}
            </MainStyles>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.main.user,
});

const mapDispatchToProps = {
    onLoginWithFacebook: loginWithFacebook,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
