import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import DepartmentListComponent from './DepartmentListComponent';
import TuringAPI from '../../../../api';

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

    render() {
        const { departments } = this.state;
        return <DepartmentListComponent departments={departments} />;
    }
}

export default DepartmentList;
