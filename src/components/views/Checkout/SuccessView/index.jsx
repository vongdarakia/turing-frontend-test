import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SuccessViewComponent from './SuccessViewComponent';
import { closeCheckoutModal as closeCheckoutModalAction } from '../../Home/duck/actions';

const SuccessView = (props) => {
    const { className, closeCheckoutModal } = props;

    return (
        <div className={className}>
            <SuccessViewComponent onClickBackToShop={closeCheckoutModal} />
        </div>
    );
};

SuccessView.propTypes = {
    className: PropTypes.string,
    closeCheckoutModal: PropTypes.func.isRequired,
};

SuccessView.defaultProps = {
    className: undefined,
};

const mapDispatchToProps = {
    closeCheckoutModal: closeCheckoutModalAction,
};

export default connect(
    undefined,
    mapDispatchToProps,
)(SuccessView);
