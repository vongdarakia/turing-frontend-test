import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import FormInputGroup from '../../common/form/FormInputGroup';
import Button from '../../common/Button';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

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
`;

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleLogin = () => {
        const { email, password } = this.state;
        const { onLogin } = this.props;

        onLogin({ email, password });
    };

    handleChangeEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    handleChangePassword = (e) => {
        this.setState({ password: e.target.value });
    };

    render() {
        const { onLoginWithFacebook, className, id } = this.props;
        const { email, password } = this.state;

        return (
            <Wrapper id={id} className={className}>
                <h2>Sign in</h2>
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
                />
                <Button
                    id="btn-login"
                    className="primary"
                    onClick={this.handleLogin}
                >
                    Sign In
                </Button>

                <h3 className="social-media-header">
                    Sign in with your social media account
                </h3>

                <FacebookLogin
                    appId="352854622106208"
                    fields="name,email,picture"
                    callback={onLoginWithFacebook}
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

LoginComponent.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onLogin: PropTypes.func.isRequired,
    onLoginWithFacebook: PropTypes.func.isRequired,
};

LoginComponent.defaultProps = {
    id: undefined,
    className: undefined,
};

export default LoginComponent;
