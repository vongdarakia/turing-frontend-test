import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';

import RegisterComponent from '../Register/RegisterComponent';
import LoginComponent from '../Login/LoginComponent';
import ProductListComponent from './ProductList/ProductListComponent';
import ProductListContainer from './ProductList';
import CategoryList from './CategoryList';
import DepartmentList from './DepartmentList';
import Checkout from '../Checkout';
// import RegisterModal from '../Register/RegisterModal';

const HomeComponent = (props) => {
    const {
        cart,
        decrementItemInCart,
        incrementItemInCart,
        isRegisterModalOpen,
        isLoginModalOpen,
        onCloseRegisterModal,
        onCloseLoginModal,
        onOpenRegisterModal,
        onOpenLoginModal,
        onLogin,
        onLoginWithFacebook,
        onLogOut,
        onRegister,
        products,
        totalProducts,
        user,
    } = props;

    return (
        <div>
            <header className="App-header">
                {user && (
                    <div>
                        <div>Hello {user.name}</div>
                        <button type="button" onClick={onLogOut}>
                            Log out
                        </button>
                    </div>
                )}
                <Modal
                    open={isRegisterModalOpen}
                    onClose={onCloseRegisterModal}
                >
                    <RegisterComponent onRegister={onRegister} />
                </Modal>

                <Modal open={isLoginModalOpen} onClose={onCloseLoginModal}>
                    <LoginComponent
                        onLogin={onLogin}
                        onLoginWithFacebook={onLoginWithFacebook}
                    />
                </Modal>
                <Checkout />
                <div>
                    <button type="button" onClick={onOpenRegisterModal}>
                        Register
                    </button>
                    <button type="button" onClick={onOpenLoginModal}>
                        Login
                    </button>
                </div>

                <CategoryList />

                <DepartmentList />

                <ProductListContainer />

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
