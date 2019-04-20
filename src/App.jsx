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

const MainStyles = styled.div`
    .facebook-auto-login {
        display: none;
    }
`;

class App extends Component {
    handleFacebookLogin = ({ accessToken } = {}) => {
        console.log('login int');
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

const mapDispatchToProps = {
    onLoginWithFacebook: loginWithFacebook,
};

export default connect(
    undefined,
    mapDispatchToProps,
)(App);
