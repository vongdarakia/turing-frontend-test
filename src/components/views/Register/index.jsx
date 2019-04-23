import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import RegisterComponent from './RegisterComponent';
import {
    registerAccount as registerAccountAction,
    loginWithFacebook as loginWithFacebookAction,
} from '../HomePage/duck/actions';

class Login extends Component {
    handleRegister = async ({ name, email, password }) => {
        const { registerAccount, onRegister } = this.props;
        const response = await registerAccount({ name, email, password });

        if (response.customer) {
            onRegister();
        }
    };

    handleRegisterWithFacebook = async ({ accessToken } = {}) => {
        const { loginWithFacebook, onRegisterWithFacebook } = this.props;

        if (accessToken) {
            const response = await loginWithFacebook({ accessToken });

            if (response.customer) {
                onRegisterWithFacebook();
            }
        }
    };

    render() {
        return (
            <RegisterComponent
                id="login-modal-view"
                onClickRegister={this.handleRegister}
                onFacebookAccountRetrieved={this.handleRegisterWithFacebook}
            />
        );
    }
}

Login.propTypes = {
    registerAccount: PropTypes.func.isRequired,
    loginWithFacebook: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
    onRegisterWithFacebook: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    registerAccount: registerAccountAction,
    loginWithFacebook: loginWithFacebookAction,
};

export default compose(
    connect(
        undefined,
        mapDispatchToProps,
    ),
)(Login);
