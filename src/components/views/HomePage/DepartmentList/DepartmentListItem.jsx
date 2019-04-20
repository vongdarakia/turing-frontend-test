import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    &.selected {
        color: red;
    }
`;

const DepartmentListItem = (props) => {
    const { department, onClick, isSelected } = props;

    return (
        <StyledButton
            type="button"
            className={`department-list-item ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
        >
            {department.name}
        </StyledButton>
    );
};

export default DepartmentListItem;
