import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RegisterComponent extends Component {
    constructor(props) {
        super(props);

        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
        this.confirmPasswordRef = React.createRef();
    }

    handleRegister = () => {
        const {
            nameRef: {
                current: { value: name },
            },
            emailRef: {
                current: { value: email },
            },
            passwordRef: {
                current: { value: password },
            },
            confirmPasswordRef: {
                current: { value: confirmPassword },
            },
        } = this;
        const { onRegister } = this.props;

        if (password === confirmPassword) {
            onRegister({ name, email, password });
        }
    };

    render() {
        return (
            <div>
                <input ref={this.nameRef} name="name" placeholder="name" />
                <input ref={this.emailRef} name="email" placeholder="email" />
                <input
                    ref={this.passwordRef}
                    name="password"
                    placeholder="password"
                />
                <input
                    ref={this.confirmPasswordRef}
                    name="confirmPassword"
                    placeholder="confirmPassword"
                />
                <button type="button" onClick={this.handleRegister}>
                    Register
                </button>
            </div>
        );
    }
}

RegisterComponent.propTypes = {
    onRegister: PropTypes.func.isRequired,
};

export default RegisterComponent;
