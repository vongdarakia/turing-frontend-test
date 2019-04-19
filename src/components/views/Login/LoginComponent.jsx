import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            </div>
        );
    }
}

LoginComponent.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default LoginComponent;
