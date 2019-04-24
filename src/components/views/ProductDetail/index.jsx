import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ProductDetailComponent from './ProductDetailComponent';
import TuringAPI from '../../../api';
import { addItemsToCart as addItemsToCartAction } from '../Cart/duck/actions';
import { closeProductDetailModal as closeProductDetailModalAction } from '../Home/duck/actions';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: undefined,
            sizeAttributes: [],
            colorAttributes: [],
            categories: [],
            selectedColorAttribute: {},
            selectedSizeAttribute: {},
            rating: 0,
            loading: true,
        };
    }

    componentDidMount = async () => {
        const { productId } = this.props;
        this.loadProduct(productId);
    };

    componentWillReceiveProps(nextProps) {
        const { productId: nextProductId } = nextProps;
        const { productId: prevProductId } = this.props;

        if (nextProductId !== prevProductId) {
            this.loadProduct(nextProductId);
        }
    }

    loadProduct = async (product_id) => {
        try {
            this.setState({ loading: true });
            const product = await TuringAPI.getProductById({ product_id });
            if (product.error) {
                throw new Error(product.error.message);
            }

            this.setState({ product });

            const attributes = await TuringAPI.getAttributesByProductId({
                product_id,
            });

            if (attributes.error) {
                throw new Error(attributes.error.message);
            }

            const colorAttributes = attributes.filter(
                ({ attribute_name }) => attribute_name === 'Color',
            );

            const sizeAttributes = attributes.filter(
                ({ attribute_name }) => attribute_name === 'Size',
            );

            this.setState({ sizeAttributes, colorAttributes });

            const categories = await TuringAPI.getCategoriesByProduct({
                product_id,
            });

            if (categories.error) {
                throw new Error(categories.error.message);
            }

            this.setState({ categories: categories.map(({ name }) => name) });

            const reviews = await TuringAPI.getProductReviews({ product_id });

            if (reviews.error) {
                throw new Error(reviews.error.message);
            }

            let avgRating = 0;

            reviews.forEach((review) => {
                avgRating += review.rating;
            });

            avgRating /= reviews.length;

            this.setState({ rating: Math.floor(avgRating) });
        } catch (error) {
            this.setState({ error: error.message });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleAddToCart = async () => {
        const { addItemsToCart, closeProductDetailModal } = this.props;
        const {
            product,
            selectedSizeAttribute: { attribute_value: size = '' } = {},
            selectedColorAttribute: { attribute_value: color = '' } = {},
        } = this.state;

        const cart_id = await TuringAPI.getCartId();

        const { error } = addItemsToCart({
            cart_id,
            product_id: product.product_id,
            attributes: `${size}, ${color}`,
        });

        if (!error) {
            closeProductDetailModal();
        }
    };

    setSize = (selectedSizeAttribute) => {
        this.setState({ selectedSizeAttribute });
    };

    setColor = (selectedColorAttribute) => {
        this.setState({ selectedColorAttribute });
    };

    render() {
        const {
            product,
            sizeAttributes,
            colorAttributes,
            categories,
            selectedColorAttribute,
            selectedSizeAttribute,
            rating,
            loading,
        } = this.state;

        return (
            <ProductDetailComponent
                product={product}
                onClickAddToCart={this.handleAddToCart}
                sizeAttributes={sizeAttributes}
                colorAttributes={colorAttributes}
                categories={categories}
                onClickSize={this.setSize}
                onClickColor={this.setColor}
                selectedColorAttribute={selectedColorAttribute}
                selectedSizeAttribute={selectedSizeAttribute}
                rating={rating}
                loading={loading}
            />
        );
    }
}

ProductDetail.propTypes = {
    addItemsToCart: PropTypes.func.isRequired,
    closeProductDetailModal: PropTypes.func.isRequired,
    productId: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    addItemsToCart: addItemsToCartAction,
    closeProductDetailModal: closeProductDetailModalAction,
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    withRouter,
)(ProductDetail);
