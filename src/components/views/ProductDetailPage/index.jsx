import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ProductDetailComponent from './ProductDetailComponent';

const ProductDetailPage = (props) => {
    return <ProductDetailComponent {...props} />;
};

const mapStateToProps = () => ({
    // cart: Object.keys(state.cart).map((key) => state.cart[key]),
});

const mapDispatchToProps = {};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withRouter,
)(ProductDetailPage);
