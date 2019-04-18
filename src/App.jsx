import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import {
    incrementItemInCart,
    decrementItemInCart,
} from './components/views/Cart/duck/actions';
import Routes from './routes';
import history from './routes/history';

class App extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="App">
                <Router history={history}>
                    <Routes />
                </Router>
                {/* <header className="App-header">
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
                </header> */}
            </div>
        );
    }
}

export default App;
