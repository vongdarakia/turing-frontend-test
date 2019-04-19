import React from 'react';

const DepartmentListItem = (props) => {
    const { department, onClick } = props;

    return (
        <button type="button" onClick={onClick}>
            {department.name}
        </button>
    );
};

export default DepartmentListItem;
