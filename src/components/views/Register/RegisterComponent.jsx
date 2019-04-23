import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import FormInputGroup from '../../common/form/FormInputGroup';
import Button from '../../common/Button';
import isValidPassword from '../../../utils/is-valid-password';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px;

    .social-media-header {
        margin-top: 24px;
        text-align: center;
    }

    button {
        min-width: 200px;
    }

    #btn-login {
        margin-top: 24px;
    }

    #btn-login-facebook {
        background-color: #3c5a99;
        color: white;
    }

    .form-input-group {
        margin: 6px 0;
        max-width: 240px;
        width: 100%;

        input {
            text-align: center;
        }
    }

    .error-message {
        color: red;
    }
`;

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
        };
    }

    handleRegister = () => {
        const { email, password, error } = this.state;
        const { onClickRegister } = this.props;

        if (!error) {
            onClickRegister({ email, password });
        }
    };

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    handleChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        const { password, error } = this.state;

        if (confirmPassword !== password && !error) {
            this.setState({ error: 'The passwords must match' });
        }

        if (confirmPassword === password && error) {
            this.setState({ error: '' });
        }

        this.setState({ confirmPassword });
    };

    render() {
        const { onFacebookAccountRetrieved, className, id } = this.props;
        const { email, password, confirmPassword, error } = this.state;

        return (
            <Wrapper id={id} className={className}>
                <h2>Sign up</h2>
                <FormInputGroup
                    inputProps={{
                        id: 'email',
                        placeholder: 'Email',
                        name: 'email',
                        value: email,
                        onChange: this.handleChangeEmail,
                    }}
                />
                <FormInputGroup
                    inputProps={{
                        id: 'password',
                        placeholder: 'Password',
                        name: 'password',
                        value: password,
                        onChange: this.handleChangePassword,
                        type: 'password',
                    }}
                    error={!!error}
                />

                <FormInputGroup
                    inputProps={{
                        id: 'confirm-password',
                        placeholder: 'Confirm password',
                        name: 'confirmPassword',
                        value: confirmPassword,
                        onChange: this.handleChangeConfirmPassword,
                        type: 'password',
                    }}
                    error={!!error}
                />
                <small className="error-message">{error}</small>
                <Button
                    id="btn-login"
                    className="primary"
                    onClick={this.handleRegister}
                    disabled={!isValidPassword(password, confirmPassword)}
                >
                    Sign up
                </Button>

                <h3 className="social-media-header">
                    Sign up with your social media account
                </h3>

                <FacebookLogin
                    appId="352854622106208"
                    fields="name,email,picture"
                    callback={onFacebookAccountRetrieved}
                    render={({ onClick }) => {
                        return (
                            <Button id="btn-login-facebook" onClick={onClick}>
                                Facebook
                            </Button>
                        );
                    }}
                />
            </Wrapper>
        );
    }
}

RegisterComponent.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onClickRegister: PropTypes.func.isRequired,
    onFacebookAccountRetrieved: PropTypes.func.isRequired,
};

RegisterComponent.defaultProps = {
    id: undefined,
    className: undefined,
};

export default RegisterComponent;
