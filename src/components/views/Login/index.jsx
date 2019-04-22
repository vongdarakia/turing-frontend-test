import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import LoginComponent from './LoginComponent';
import {
    login as loginAction,
    loginWithFacebook as loginWithFacebookAction,
} from '../HomePage/duck/actions';

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
        return (
            <LoginComponent
                id="login-modal-view"
                onLogin={this.handleLogin}
                onLoginWithFacebook={this.handleLoginWithFacebook}
            />
        );
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    loginWithFacebook: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLoginWithFacebook: PropTypes.func.isRequired,
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
