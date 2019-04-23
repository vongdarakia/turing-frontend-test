import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CategoryListItem from './CategoryListItem';

const Wrapper = styled.div`
    padding: 16px;

    .category-title {
        margin-top: 12px;
    }
`;

const CategoryListComponent = (props) => {
    const { categories, onSelectCategory, selectedCategory, className } = props;
    const selectedId = (selectedCategory || {}).category_id;

    return (
        <Wrapper className={className}>
            <h2 className="category-title">Categories</h2>
            {categories.map((category) => {
                return (
                    <CategoryListItem
                        key={category.category_id}
                        category={category}
                        onClick={() => onSelectCategory(category)}
                        isSelected={category.category_id === selectedId}
                    />
                );
            })}
        </Wrapper>
    );
};

CategoryListComponent.propTypes = {
    onSelectCategory: PropTypes.func.isRequired,
    className: PropTypes.string,
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            category_id: PropTypes.number,
        }),
    ),
    selectedCategory: PropTypes.shape({
        name: PropTypes.string,
        category_id: PropTypes.number,
    }),
};

CategoryListComponent.defaultProps = {
    className: 'category-list',
    categories: [],
    selectedCategory: undefined,
};

export default CategoryListComponent;
