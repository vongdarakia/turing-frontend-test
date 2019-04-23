import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderComponent from './HeaderComponent';
import {
    openRegisterModal as openRegisterModalAction,
    openCheckoutModal as openCheckoutModalAction,
    openLoginModal as openLoginModalAction,
} from '../duck/actions';
import getCartLineItemsFromTable from '../../../../utils/get-cart-line-items';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCartModalOpen: false,
            subtotal: '0.00',
            numItems: 0,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { cart } = nextProps;
        let subtotal = 0;
        let numItems = 0;

        cart.forEach((lineItem) => {
            subtotal += parseFloat(lineItem.subtotal);
            numItems += lineItem.quantity;
        });

        return {
            ...prevState,
            subtotal: subtotal.toFixed(2),
            numItems,
        };
    }

    render() {
        const {
            openRegisterModal,
            openCheckoutModal,
            openLoginModal,
        } = this.props;
        const { subtotal, numItems } = this.state;

        return (
            <HeaderComponent
                onClickRegister={openRegisterModal}
                onClickLogin={openLoginModal}
                onClickCart={openCheckoutModal}
                numItems={numItems}
                subtotal={subtotal}
            />
        );
    }
}

Header.propTypes = {
    openRegisterModal: PropTypes.func.isRequired,
    openCheckoutModal: PropTypes.func.isRequired,
    openLoginModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    open: state.main.isRegisterModalOpen,
    cart: getCartLineItemsFromTable(state.cart),
});

const mapDispatchToProps = {
    openRegisterModal: openRegisterModalAction,
    openCheckoutModal: openCheckoutModalAction,
    openLoginModal: openLoginModalAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
