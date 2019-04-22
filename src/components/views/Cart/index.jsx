import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectStripe } from 'react-stripe-elements';

import CartComponent from './CartComponent';
import ViewFooter from '../../common/ViewFooter';
import {
    incrementItemInCart,
    decrementItemInCart,
    removeItemFromCart,
} from './duck/actions';
import getCartLineItemsFromTable from '../../../utils/get-cart-line-items';

class Cart extends Component {
    constructor(props) {
        super(props);

        const { onClickBackToShop, onClickNext, cart } = props;

        this.state = {
            btnPropsPrimary: {
                onClick: onClickNext,
                disabled: cart.length === 0,
            },
            btnPropsSecondary: {
                onClick: onClickBackToShop,
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

const mapStateToProps = (state) => ({
    user: state.main.user,
    cart: getCartLineItemsFromTable(state.cart),
});

const mapDispatchToProps = {
    increaseItemInCart: incrementItemInCart,
    decreaseItemInCart: decrementItemInCart,
    deleteItem: removeItemFromCart,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
)(Cart);
