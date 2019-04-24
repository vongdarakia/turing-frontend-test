import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductListComponent from './ProductListComponent';
import TuringAPI from '../../../../api';
import { openProductDetailModal as openProductDetailModalAction } from '../duck/actions';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totalProducts: 0,
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

        if (nextCategory !== prevCategory && nextCategory) {
            if (
                nextCategory &&
                prevCategory &&
                nextCategory.category_id === prevCategory.category_id
            ) {
                return;
            }

            this.setState({ page: 1 });

            await this.loadProducts({
                category_id: (nextCategory || {}).category_id,
            });
            return;
        }

        if (nextDept !== prevDept && nextDept) {
            if (
                nextDept &&
                prevDept &&
                nextDept.department_id === prevDept.department_id
            ) {
                return;
            }

            this.setState({ page: 1 });

            await this.loadProducts({
                department_id: (nextDept || {}).department_id,
            });
            return;
        }

        if (
            (nextDept !== prevDept && !nextDept) ||
            (nextCategory !== prevCategory && !nextCategory)
        ) {
            await this.loadProducts();
        }
    };

    loadProducts = async ({ page, category_id, department_id } = {}) => {
        let { products, count } = await TuringAPI.getAllProducts({
            page,
        });

        if (category_id) {
            ({
                products = [],
                count = 0,
            } = await TuringAPI.getProductsByCategory({
                page,
                category_id,
            }));
        } else if (department_id) {
            ({
                products = [],
                count = 0,
            } = await TuringAPI.getProductsByDepartment({
                page,
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
        const { openProductDetailModal } = this.props;

        return (
            <ProductListComponent
                onChangePage={this.handleChangePage}
                page={page}
                products={products}
                totalProducts={totalProducts}
                onClickQuickView={openProductDetailModal}
            />
        );
    }
}

ProductList.propTypes = {
    openProductDetailModal: PropTypes.func.isRequired,
    selectedCategory: PropTypes.shape({
        category_id: PropTypes.number,
    }),
    selectedDepartment: PropTypes.shape({
        department_id: PropTypes.number,
    }),
};

ProductList.defaultProps = {
    selectedCategory: undefined,
    selectedDepartment: undefined,
};

const mapStateToProps = (state) => ({
    selectedDepartment: state.main.selectedDepartment,
    selectedCategory: state.main.selectedCategory,
});

const mapDispatchToProps = {
    openProductDetailModal: openProductDetailModalAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductList);
