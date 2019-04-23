import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShopmateHeaderComponent from './ShopmateHeaderComponent';
import {
    selectDepartment as selectDepartmentAction,
    storeDepartments as storeDepartmentsAction,
    storeCategories as storeCategoriesAction,
    clearCategory as clearCategoryAction,
    clearDepartment as clearDepartmentAction,
} from '../duck/actions';
import TuringAPI from '../../../../api';

class ShopmateHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
        };
    }

    clearSearch = () => {
        this.setState({ search: '' });
    };

    handleChangeSearch = (e) => {
        this.setState({ search: e.target.value });
    };

    handleClickBrand = async () => {
        const {
            storeDepartments,
            storeCategories,
            clearCategory,
            clearDepartment,
        } = this.props;

        const departments = await TuringAPI.getAllDepartments();
        const { categories } = await TuringAPI.getAllCategories();

        clearCategory();
        clearDepartment();
        storeDepartments(departments);
        storeCategories(categories);
    };

    render() {
        const {
            departments,
            selectedDepartmentId,
            selectDepartment,
        } = this.props;
        const { search } = this.state;

        return (
            <ShopmateHeaderComponent
                onChangeSearch={this.handleChangeSearch}
                onClickBrand={this.handleClickBrand}
                onClickClearSearch={this.clearSearch}
                onClickDepartment={selectDepartment}
                departments={departments}
                selectedDepartmentId={selectedDepartmentId}
                search={search}
            />
        );
    }
}

ShopmateHeader.propTypes = {
    departments: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            department_id: PropTypes.number,
        }),
    ),
    selectedDepartmentId: PropTypes.number,
    selectDepartment: PropTypes.func.isRequired,
    storeDepartments: PropTypes.func.isRequired,
    storeCategories: PropTypes.func.isRequired,
    clearCategory: PropTypes.func.isRequired,
    clearDepartment: PropTypes.func.isRequired,
};

ShopmateHeader.defaultProps = {
    selectedDepartmentId: undefined,
    departments: [],
};

const mapStateToProps = (state) => ({
    departments: state.main.departments,
    selectedDepartmentId: state.main.selectedDepartment
        ? state.main.selectedDepartment.department_id
        : undefined,
});

const mapDispatchToProps = {
    selectDepartment: selectDepartmentAction,
    storeDepartments: storeDepartmentsAction,
    storeCategories: storeCategoriesAction,
    clearCategory: clearCategoryAction,
    clearDepartment: clearDepartmentAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopmateHeader);
