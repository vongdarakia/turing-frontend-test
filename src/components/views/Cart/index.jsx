import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CartComponent from './CartComponent';
import ViewFooter from '../../common/ViewFooter';
import {
    incrementItemInCart,
    decrementItemInCart,
    removeItemFromCart,
} from './duck/actions';
import getCartLineItemsFromTable from '../../../utils/get-cart-line-items';
import { closeCheckoutModal as closeCheckoutModalAction } from '../Home/duck/actions';

class Cart extends Component {
    constructor(props) {
        super(props);

        const { closeCheckoutModal, onClickNext, cart } = props;

        this.state = {
            btnPropsPrimary: {
                onClick: onClickNext,
                disabled: cart.length === 0,
            },
            btnPropsSecondary: {
                onClick: closeCheckoutModal,
            },
        };
    }

    componentWillReceiveProps(nextProps) {
        const { cart: nextCart } = nextProps;
        const { btnPropsPrimary } = this.state;

        if (btnPropsPrimary.disabled !== (nextCart.length === 0)) {
            this.setState({
                btnPropsPrimary: {
                    ...btnPropsPrimary,
                    disabled: nextCart.length === 0,
                },
            });
        }
    }

    render() {
        const {
            className,
            cart,
            increaseItemInCart,
            decreaseItemInCart,
            deleteItem,
        } = this.props;
        const { btnPropsPrimary, btnPropsSecondary } = this.state;

        return (
            <div className={className}>
                <CartComponent
                    cart={cart}
                    onRemoveItemFromCart={deleteItem}
                    onRemoveItem={decreaseItemInCart}
                    onAddItem={increaseItemInCart}
                />
                <ViewFooter
                    labelPrimary="Checkout"
                    labelSecondary="Back to shop"
                    btnPropsPrimary={btnPropsPrimary}
                    btnPropsSecondary={btnPropsSecondary}
                />
            </div>
        );
    }
}

Cart.propTypes = {
    className: PropTypes.string,
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            price: PropTypes.string,
            quantity: PropTypes.number,
            attributes: PropTypes.string,
        }),
    ).isRequired,
    increaseItemInCart: PropTypes.func.isRequired,
    decreaseItemInCart: PropTypes.func.isRequired,
    closeCheckoutModal: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
};

Cart.defaultProps = {
    className: undefined,
};

const mapStateToProps = (state) => ({
    cart: getCartLineItemsFromTable(state.cart),
});

const mapDispatchToProps = {
    increaseItemInCart: incrementItemInCart,
    decreaseItemInCart: decrementItemInCart,
    deleteItem: removeItemFromCart,
    closeCheckoutModal: closeCheckoutModalAction,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Cart);
