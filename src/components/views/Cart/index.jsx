import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartView from './CartView';
import TuringAPI from '../../../api';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        // TuringAPI.getCartById
    }

    render() {
        return <CartView />;
    }
}

export default Cart;
