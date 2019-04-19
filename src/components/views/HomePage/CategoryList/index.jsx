import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CategoryListComponent from './CategoryListComponent';
import TuringAPI from '../../../../api';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount = async () => {
        const { categories, count } =
            (await TuringAPI.getAllCategories()) || [];
        this.setState({ categories });
    };

    handleSelectCategory = (category) => {};

    render() {
        const { categories } = this.state;
        return (
            <CategoryListComponent
                categories={categories}
                onSelectCategory={this.handleSelectCategory}
            />
        );
    }
}

export default CategoryList;
