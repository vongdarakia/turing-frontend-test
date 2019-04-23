import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_COLOR } from '../../../../styles/settings';

const StyledButton = styled.h3`
    cursor: pointer;

    :hover {
        color: ${PRIMARY_COLOR};
    }

    &.selected {
        color: ${PRIMARY_COLOR};
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

CategoryListItem.propTypes = {
    category: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
};

CategoryListItem.defaultProps = {
    isSelected: false,
};

export default CategoryListItem;
