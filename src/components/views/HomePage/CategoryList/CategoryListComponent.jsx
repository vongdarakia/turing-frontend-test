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
    const { categories } = props;
    return (
        <Wrapper>
            <div className="category-title">Categories</div>
            {categories.map((category) => {
                return <CategoryListItem category={category} />;
            })}
        </Wrapper>
    );
};

export default CategoryListComponent;
