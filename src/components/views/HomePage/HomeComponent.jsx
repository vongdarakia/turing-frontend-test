import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo.svg';

const HomeComponent = (props) => {
    const { cart, incrementItemInCart, decrementItemInCart } = props;
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
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
