import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ProductDetailComponent from './ProductDetailComponent';
import TuringAPI from '../../../api';
import {
    incrementItemInCart,
    updateItemInCart,
    addItemsToCart,
} from '../Cart/duck/actions';

class ProductDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: undefined,
            quantity: 1,
        };
    }

    handleAddToCart = () => {
        const { addToCart } = this.props;
        const { product, quantity } = this.state;

        addToCart(product, quantity);
    };

    componentDidMount = async () => {
        const {
            match: { params: { productId: product_id } = {} } = {},
        } = this.props;
        const product = await TuringAPI.getProductById({ product_id });

        this.setState({ product });
    };

    render() {
        const { product } = this.state;
        console.log(this.props);
        return (
            <ProductDetailComponent
                {...this.props}
                product={product}
                onAddToCart={this.handleAddToCart}
            />
        );
    }
}

const mapStateToProps = () => ({
    // cart: Object.keys(state.cart).map((key) => state.cart[key]),
});

const mapDispatchToProps = {
    // onUpdateItemInCart:,
    addToCart: addItemsToCart,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withRouter,
)(ProductDetailPage);
