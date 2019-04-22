import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SuccessViewComponent from './SuccessViewComponent';

class SuccessView extends Component {
    handleGoBackToShop = () => {
        const { onCloseModal } = this.props;

        onCloseModal();
    };

    render() {
        const { className } = this.props;

        return (
            <div className={className}>
                <SuccessViewComponent
                    onClickBackToShop={this.handleGoBackToShop}
                />
            </div>
        );
    }
}

SuccessView.propTypes = {
    className: PropTypes.string,
    onCloseModal: PropTypes.func.isRequired,
};

SuccessView.defaultProps = {
    className: undefined,
};

export default SuccessView;
