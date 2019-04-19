import React from 'react';
import styled from 'styled-components';

import DepartmentListItem from './DepartmentListItem';

const Wrapper = styled.div`
    padding: 16px;
    border: 1px solid white;

    .department-title {
        margin-bottom: 12px;
    }
`;

const DepartmentListComponent = (props) => {
    const { departments, onSelectDepartment } = props;
    return (
        <Wrapper>
            <div className="department-title">Departments</div>
            {departments.map((department) => {
                return (
                    <DepartmentListItem
                        key={department.department_id}
                        department={department}
                        onClick={() => {
                            onSelectDepartment(department);
                        }}
                    />
                );
            })}
        </Wrapper>
    );
};

export default DepartmentListComponent;
