import React, { Component } from 'react';
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
        const { selectedCategory } = this.props;

        return (
            <CategoryListComponent
                categories={categories}
                onSelectCategory={this.handleSelectCategory}
                selectedCategory={selectedCategory}
            />
        );
    }
}

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
