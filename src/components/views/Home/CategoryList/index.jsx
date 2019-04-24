import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryListComponent from './CategoryListComponent';
import TuringAPI from '../../../../api';
import { selectCategory } from '../duck/actions';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount = async () => {
        return this.loadCategories();
    };

    componentWillReceiveProps = async (nextProps) => {
        const { selectedDepartment: nextDept } = nextProps;
        const { selectedDepartment: prevDept } = this.props;

        if (nextDept !== prevDept) {
            if (
                nextDept &&
                prevDept &&
                nextDept.department_id === prevDept.department_id
            ) {
                return;
            }
            await this.loadCategories(nextDept);
        }
    };

    loadCategories = async (selectedDepartment) => {
        let categories = [];

        if (selectedDepartment) {
            categories = await TuringAPI.getCategoriesByDepartment({
                department_id: selectedDepartment.department_id,
            });
        } else {
            ({ categories } = await TuringAPI.getAllCategories());
        }

        this.setState({ categories: categories || [] });
    };

    handleSelectCategory = (category) => {
        const { onSelectCategory } = this.props;
        onSelectCategory(category);
    };

    render() {
        const { categories } = this.state;
        const { selectedCategory, className } = this.props;

        return (
            <CategoryListComponent
                className={className}
                categories={categories}
                onSelectCategory={this.handleSelectCategory}
                selectedCategory={selectedCategory}
            />
        );
    }
}

CategoryList.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
    className: PropTypes.string,
    selectedCategory: PropTypes.shape({
        name: PropTypes.string,
        category_id: PropTypes.number,
    }),
    selectedDepartment: PropTypes.shape({
        name: PropTypes.string,
        department_id: PropTypes.number,
    }),
};

CategoryList.defaultProps = {
    className: undefined,
    selectedCategory: undefined,
    selectedDepartment: undefined,
};

const mapStateToProps = (state) => ({
    selectedCategory: state.main.selectedCategory,
    selectedDepartment: state.main.selectedDepartment,
});

const mapDispatchToProps = {
    onSelectCategory: selectCategory,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CategoryList);
