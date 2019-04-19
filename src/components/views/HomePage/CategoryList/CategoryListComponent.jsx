import React from 'react';
import styled from 'styled-components';

import CategoryListItem from './CategoryListItem';

const Wrapper = styled.div`
    padding: 16px;
    border: 1px solid white;

    .category-title {
        margin-bottom: 12px;
    }
`;

const CategoryListComponent = (props) => {
    const { categories, onSelectCategory } = props;
    return (
        <Wrapper>
            <div className="category-title">Categories</div>
            {categories.map((category) => {
                return (
                    <CategoryListItem
                        key={category.category_id}
                        category={category}
                        onClick={() => onSelectCategory(category)}
                    />
                );
            })}
        </Wrapper>
    );
};

export default CategoryListComponent;
