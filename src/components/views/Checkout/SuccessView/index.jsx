import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SuccessViewComponent from './SuccessViewComponent';

class SuccessView extends Component {
    handleGoBackToShop = () => {
        const { onClickBackToShop } = this.props;

        onClickBackToShop();
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
    onClickBackToShop: PropTypes.func.isRequired,
};

SuccessView.defaultProps = {
    className: undefined,
};

export default SuccessView;
