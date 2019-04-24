import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SearchBar from '../../../common/SeachBar';
import { PRIMARY_COLOR } from '../../../../styles/settings';

const Wrapper = styled.div`
    padding: 20px 18px;
    display: flex;
    background-color: #2e2e2e;
    font-size: 12px;
    font-weight: bold;
    align-items: baseline;

    .header-brand {
        color: ${PRIMARY_COLOR};
        margin: 0;
        letter-spacing: 2px;
        margin-right: auto;
        cursor: pointer;
    }

    .section-department {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        color: #f7f7f7;
        font-size: 16px;
        margin: 0 auto;

        .department {
            margin: 0 8px;
            cursor: pointer;

            :hover {
                color: ${PRIMARY_COLOR};
            }

            &.selected {
                color: ${PRIMARY_COLOR};
            }
        }
    }

    .section-search-bar {
        align-self: center;
        margin-left: auto;
    }
`;

const ShopmateHeaderComponent = (props) => {
    const {
        search,
        onChangeSearch,
        onClickClearSearch,
        onClickDepartment,
        onClickBrand,
        departments,
        selectedDepartmentId,
    } = props;

    return (
        <Wrapper>
            <h2 className="header-brand" onClick={onClickBrand}>
                SHOPMATE
            </h2>
            <div className="section-department">
                {departments.map((department) => {
                    const { department_id, name } = department;
                    return (
                        <div
                            key={name}
                            className={`department ${
                                department_id === selectedDepartmentId
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={() => {
                                onClickDepartment(department);
                            }}
                        >
                            {name}
                        </div>
                    );
                })}
            </div>
            <SearchBar
                search={search}
                onClickClearSearch={onClickClearSearch}
                onChangeSearch={onChangeSearch}
            />
        </Wrapper>
    );
};

ShopmateHeaderComponent.propTypes = {
    search: PropTypes.string.isRequired,
    onClickBrand: PropTypes.func.isRequired,
    onClickClearSearch: PropTypes.func.isRequired,
    onClickDepartment: PropTypes.func.isRequired,
    onChangeSearch: PropTypes.func.isRequired,
    departments: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            department_id: PropTypes.number,
        }),
    ),
    selectedDepartmentId: PropTypes.number,
};

ShopmateHeaderComponent.defaultProps = {
    departments: [],
    selectedDepartmentId: undefined,
};

export default ShopmateHeaderComponent;
