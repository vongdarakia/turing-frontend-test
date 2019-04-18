import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import HomeComponent from './HomeComponent';
import { incrementItemInCart, decrementItemInCart } from '../Cart/duck/actions';

const HomePage = (props) => {
    return <HomeComponent {...props} />;
};

const mapStateToProps = (state) => ({
    cart: Object.keys(state.cart).map((key) => state.cart[key]),
});

const mapDispatchToProps = {
    incrementItemInCart,
    decrementItemInCart,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    // withRouter,
)(HomePage);
