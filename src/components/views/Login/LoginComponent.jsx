import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import styled from 'styled-components';
import TuringAPI from '../../../api';

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    width: 100%;
    input {
        height: initial;
    }
`;

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    handleLogin = () => {
        const {
            emailRef: {
                current: { value: email },
            },
            passwordRef: {
                current: { value: password },
            },
        } = this;
        const { onLogin } = this.props;

        onLogin({ email, password });
    };

    handleFacebookLogin = ({ accessToken } = {}) => {
        const { onLoginWithFacebook } = this.props;
        onLoginWithFacebook({ accessToken });
    };

    render() {
        return (
            <div>
                <input ref={this.emailRef} name="email" placeholder="email" />
                <input
                    ref={this.passwordRef}
                    name="password"
                    placeholder="password"
                />
                <button type="button" onClick={this.handleLogin}>
                    Login
                </button>
                <FacebookLogin
                    appId="352854622106208"
                    // autoLoad={true}
                    fields="name,email,picture"
                    onClick={() => console.log('click')}
                    callback={this.handleFacebookLogin}
                />
            </div>
        );
    }
}

LoginComponent.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;
