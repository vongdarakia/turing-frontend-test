import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ConfirmationViewComponent from './ConfirmationViewComponent';
import {
    updateAddress,
    updateCity,
    updateFirstName,
    updateLastName,
    updateShippingOptionId,
    updateZipCode,
    updateState,
} from '../duck/actions';
import TuringAPI from '../../../../api';
import ViewFooter from '../../../common/ViewFooter';

class ConfirmationView extends Component {
    constructor(props) {
        super(props);

        const { cart } = props;
        let subtotal = 0;

        cart.forEach((lineItem) => {
            subtotal += lineItem.subtotal;
        });

        this.state = {
            subtotal,
            shippingOption: [],
            btnPropsPrimary: {
                onClick: this.handleGoNext,
            },
            btnPropsSecondary: {
                onClick: this.handleGoBack,
            },
        };
    }

    componentDidMount = async () => {
        const { shippingOptionId } = this.props;
        const US_REGION_ID = 2;
        const shippingOptions = await TuringAPI.getShippingOptionsByRegionId({
            shipping_region_id: US_REGION_ID,
        });
        let shippingOption;

        for (let index = 0; index < shippingOptions.length; index += 1) {
            if (shippingOptions[index].shipping_id === shippingOptionId) {
                shippingOption = shippingOptions[index];
                break;
            }
        }

        this.setState({ shippingOption });
    };

    handleGoNext = async () => {
        console.log('going next');
    };

    handleGoBack = () => {};

    getGrandTotal = () => {
        const { shippingOption, subtotal } = this.state;
        let grandTotal = subtotal;

        if (shippingOption) {
            grandTotal += shippingOption.shipping_cost;
        }

        return grandTotal;
    };

    render() {
        const {
            className,
            address,
            city,
            state,
            zipCode,
            country,
            cart,
        } = this.props;
        const {
            subtotal,
            shippingOption,
            btnPropsPrimary,
            btnPropsSecondary,
        } = this.state;

        return (
            <div className={className}>
                <ConfirmationViewComponent
                    address={address}
                    city={city}
                    state={state}
                    zipCode={zipCode}
                    country={country}
                    shippingOption={shippingOption}
                    cart={cart}
                    subtotal={subtotal}
                    grandTotal={this.getGrandTotal()}
                />
                <ViewFooter
                    labelPrimary="Next Step"
                    labelSecondary="Back"
                    btnPropsPrimary={btnPropsPrimary}
                    btnPropsSecondary={btnPropsSecondary}
                />
            </div>
        );
    }
}

ConfirmationView.propTypes = {
    className: PropTypes.string,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    shippingOptionId: PropTypes.number.isRequired,
    user: PropTypes.shape({
        country: PropTypes.string,
        region: PropTypes.string,
        shipping_region_id: PropTypes.number,
    }),
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            quantity: PropTypes.number,
            sub_total: PropTypes.number,
        }),
    ).isRequired,
};

ConfirmationView.defaultProps = {
    className: '',
    user: undefined,
};

const mapStateToProps = (state) => ({
    firstName: state.checkout.firstName,
    lastName: state.checkout.lastName,
    address: state.checkout.address,
    city: state.checkout.city,
    state: state.checkout.state,
    zipCode: state.checkout.zipCode,
    country: state.checkout.country,
    shippingOptionId: state.checkout.shippingOptionId,
    user: state.main.user,
    cart: state.cart,
});

const mapDispatchToProps = {
    changeFirstName: updateFirstName,
    changeLastName: updateLastName,
    changeAddress: updateAddress,
    changeCity: updateCity,
    changeZipCode: updateZipCode,
    changeState: updateState,
    changeShippingOptionId: updateShippingOptionId,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ConfirmationView);
