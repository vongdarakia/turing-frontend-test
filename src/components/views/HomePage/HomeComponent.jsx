import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';

import logo from '../../../logo.svg';
import RegisterComponent from '../Register/RegisterComponent';
// import RegisterModal from '../Register/RegisterModal';

const HomeComponent = (props) => {
    const {
        cart,
        incrementItemInCart,
        decrementItemInCart,
        isRegisterModalOpen,
        onCloseRegisterModal,
        onOpenRegisterModal,
        onRegister,
    } = props;

    return (
        <div>
            <header className="App-header">
                <Modal
                    open={isRegisterModalOpen}
                    onClose={onCloseRegisterModal}
                >
                    <RegisterComponent onRegister={onRegister} />
                </Modal>
                <div>
                    <button type="button" onClick={onOpenRegisterModal}>
                        Register
                    </button>
                    <button type="button">Login</button>
                </div>

                {cart.map((lineItem) => {
                    return (
                        <div>
                            {lineItem.item.name} x {lineItem.amount}
                        </div>
                    );
                })}
                <button
                    type="button"
                    onClick={() => {
                        incrementItemInCart({
                            product_id: 'abc',
                            name: 'Shirt',
                        });
                    }}
                >
                    Increment
                </button>
                <button
                    type="button"
                    onClick={() => {
                        decrementItemInCart({
                            product_id: 'abc',
                            name: 'Shirt',
                        });
                    }}
                >
                    Decrement
                </button>
                <Link to="/product/abc">Go to product</Link>
            </header>
        </div>
    );
};

export default HomeComponent;
