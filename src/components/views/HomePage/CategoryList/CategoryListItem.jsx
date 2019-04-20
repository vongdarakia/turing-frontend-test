import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    &.selected {
        color: red;
    }
`;

const CategoryListItem = (props) => {
    const { category, onClick, isSelected } = props;

    return (
        <StyledButton
            type="button"
            className={`category-list-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {category.name}
        </StyledButton>
    );
};

export default CategoryListItem;
