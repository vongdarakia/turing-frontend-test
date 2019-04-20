import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductListComponent from './ProductListComponent';
import TuringAPI from '../../../../api';

class ProductList extends Component {
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
        const { selectedCategory, selectedDepartment } = this.props;
        const { category_id } = selectedCategory || {};
        const { department_id } = selectedDepartment || {};

        this.loadProducts({ page, category_id, department_id });
    };

    componentWillReceiveProps = async (nextProps) => {
        const {
            selectedDepartment: nextDept,
            selectedCategory: nextCategory,
        } = nextProps;
        const {
            selectedDepartment: prevDept,
            selectedCategory: prevCategory,
        } = this.props;

        if (nextCategory !== prevCategory) {
            if (
                nextCategory &&
                prevCategory &&
                nextCategory.category_id === prevCategory.category_id
            ) {
                return;
            }
            await this.loadProducts({
                category_id: (nextCategory || {}).category_id,
            });
            return;
        }

        if (
            nextDept !== prevDept &&
            !(nextCategory && nextCategory.category_id)
        ) {
            if (
                nextDept &&
                prevDept &&
                nextDept.department_id === prevDept.department_id
            ) {
                return;
            }
            await this.loadProducts({
                department_id: (nextDept || {}).department_id,
            });
        }
    };

    loadProducts = async ({ page, category_id, department_id }) => {
        let { products, count } = await TuringAPI.getAllProducts({
            page,
        });

        if (category_id) {
            ({
                products = [],
                count = 0,
            } = await TuringAPI.getProductsByCategory({
                category_id,
            }));
        } else if (department_id) {
            ({
                products = [],
                count = 0,
            } = await TuringAPI.getProductsByDepartment({
                department_id,
            }));
        }

        this.setState({
            products,
            totalProducts: count,
        });
    };

    handleChangePage = (page) => {
        const { selectedCategory, selectedDepartment } = this.props;
        const { category_id } = selectedCategory || {};
        const { department_id } = selectedDepartment || {};

        this.setState({ page });
        this.loadProducts({ page, category_id, department_id });
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

const mapStateToProps = (state) => ({
    selectedDepartment: state.main.selectedDepartment,
    selectedCategory: state.main.selectedCategory,
});

const mapDispatchToProps = {
    // onSelectDepartment: selectDepartment,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductList);
