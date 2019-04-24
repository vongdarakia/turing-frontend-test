import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import './App.css';
import { storeCart as storeCartAction } from './components/views/Cart/duck/actions';
import Routes from './routes';
import history from './routes/history';
import {
    loginWithFacebook,
    storeDepartments as storeDepartmentsAction,
    storeCategories as storeCategoriesAction,
} from './components/views/Home/duck/actions';
import { KEY_TOKEN } from './api/config';
import TuringAPI from './api';
import MainStyles from './styles/MainStyle';
import GlobalStyle from './styles/GlobalStyle';

class App extends Component {
    componentDidMount = async () => {
        const {
            user,
            storeCart,
            storeDepartments,
            storeCategories,
        } = this.props;

        const cart = await TuringAPI.getCart();
        storeCart(cart);

        const departments = await TuringAPI.getAllDepartments();
        const { categories } = await TuringAPI.getAllCategories();

        storeDepartments(departments);
        storeCategories(categories);
    };

    handleFacebookLogin = ({ accessToken } = {}) => {
        const { onLoginWithFacebook } = this.props;
        onLoginWithFacebook({ accessToken });
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
        return (
            <MainStyles className="App">
                <Router history={history}>
                    <GlobalStyle />
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
    storeCart: storeCartAction,
    storeDepartments: storeDepartmentsAction,
    storeCategories: storeCategoriesAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
