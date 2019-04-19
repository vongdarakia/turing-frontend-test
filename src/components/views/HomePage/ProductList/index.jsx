import React, { Component } from 'react';
import ProductListComponent from './ProductListComponent';
import TuringAPI from '../../../../api';

class ProductListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalProducts: [],
            page: 1,
        };
    }

    componentDidMount = async () => {
        const { page } = this.state;
        this.fetchAllProducts({ page });
    };

    fetchAllProducts = async ({ page }) => {
        const { products, count } = await TuringAPI.getAllProducts({
            page,
        });
        this.setState({
            products,
            totalProducts: count,
        });
    };

    handleChangePage = (page) => {
        this.setState({
            page,
        });

        this.fetchAllProducts({ page });
    };

    render() {
        const { page, products, totalProducts } = this.state;
        return (
            <ProductListComponent
                onChangePage={this.handleChangePage}
                page={page}
                products={products}
                totalProducts={totalProducts}
            />
        );
    }
}

export default ProductListContainer;
