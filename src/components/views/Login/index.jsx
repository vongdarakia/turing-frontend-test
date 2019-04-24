import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LoginComponent from './LoginComponent';
import {
    login as loginAction,
    loginWithFacebook as loginWithFacebookAction,
} from '../Home/duck/actions';

class Login extends Component {
    handleLogin = async ({ email, password }) => {
        const { login, onLogin } = this.props;
        const response = await login({ email, password });

        if (response.user) {
            onLogin();
        }
    };

    handleLoginWithFacebook = async ({ accessToken }) => {
        const { loginWithFacebook, onLoginWithFacebook } = this.props;
        const response = await loginWithFacebook({ accessToken });

        if (response.customer) {
            onLoginWithFacebook();
        }
    };

    render() {
        const { className } = this.props;

        return (
            <LoginComponent
                className={className}
                id="login-modal-view"
                onClickLogin={this.handleLogin}
                onFacebookAccountRetrieved={this.handleLoginWithFacebook}
            />
        );
    }
}

Login.propTypes = {
    className: PropTypes.string,
    login: PropTypes.func.isRequired,
    loginWithFacebook: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLoginWithFacebook: PropTypes.func.isRequired,
};

Login.defaultProps = {
    className: undefined,
};

const mapDispatchToProps = {
    login: loginAction,
    loginWithFacebook: loginWithFacebookAction,
};

export default compose(
    connect(
        undefined,
        mapDispatchToProps,
    ),
)(Login);
