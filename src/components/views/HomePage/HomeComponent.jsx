import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Modal from '@material-ui/core/Modal';

import RegisterComponent from '../Register/RegisterComponent';
import LoginComponent from '../Login/LoginComponent';
import ProductListComponent from './ProductList/ProductListComponent';
import ProductListContainer from './ProductList';
import CategoryList from './CategoryList';
import DepartmentList from './DepartmentList';
import Checkout from '../Checkout';
import Modal from '../../common/Modal';
import LoginModal from '../Login/LoginModal';
import RegisterModal from '../Register/RegisterModal';
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
        onCloseCheckoutModal,
        isCheckoutModalOpen,
        onOpenCheckoutModal,
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

                <Link to="/product/abc">Go to product</Link>
            </header>
        </div>
    );
};

export default HomeComponent;
