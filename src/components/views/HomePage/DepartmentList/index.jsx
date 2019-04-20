import React, { Component } from 'react';
import { connect } from 'react-redux';

import DepartmentListComponent from './DepartmentListComponent';
import TuringAPI from '../../../../api';
import { selectDepartment } from '../duck/actions';

class DepartmentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: [],
        };
    }

    componentDidMount = async () => {
        const departments = (await TuringAPI.getAllDepartments()) || [];
        this.setState({ departments });
    };

    handleSelectDepartment = (department) => {
        const { onSelectDepartment } = this.props;
        onSelectDepartment(department);
    };

    render() {
        const { departments } = this.state;
        const { selectedDepartment } = this.props;

        return (
            <DepartmentListComponent
                departments={departments}
                onSelectDepartment={this.handleSelectDepartment}
                selectedDepartment={selectedDepartment}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    selectedDepartment: state.main.selectedDepartment,
});

const mapDispatchToProps = {
    onSelectDepartment: selectDepartment,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DepartmentList);
