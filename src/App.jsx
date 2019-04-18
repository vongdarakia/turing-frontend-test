import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';
import {
    incrementItemInCart,
    decrementItemInCart,
} from './components/views/cart/duck/actions';

class App extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    {this.props.cart.map((lineItem) => {
                        return (
                            <div>
                                {lineItem.item.name} x {lineItem.amount}
                            </div>
                        );
                    })}
                    <button
                        onClick={() => {
                            console.log('clicking');
                            this.props.incrementItemInCart({
                                product_id: 'abc',
                                name: 'Shirt',
                            });
                        }}
                    >
                        Increment
                    </button>
                    <button
                        onClick={() => {
                            this.props.decrementItemInCart({
                                product_id: 'abc',
                                name: 'Shirt',
                            });
                        }}
                    >
                        Decrement
                    </button>
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: Object.keys(state.cart).map((key) => state.cart[key]),
});

const mapDispatchToProps = {
    incrementItemInCart,
    decrementItemInCart,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
