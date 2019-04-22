import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DeliveryViewComponent from './DeliveryViewComponent';
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

class DeliverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingOptions: [],
            btnPropsPrimary: {
                onClick: this.handleGoNext,
            },
            btnPropsSecondary: {
                onClick: this.handleGoBack,
            },
        };
    }

    componentDidMount = async () => {
        const US_REGION_ID = 2;
        const shippingOptions = await TuringAPI.getShippingOptionsByRegionId({
            shipping_region_id: US_REGION_ID,
        });

        this.setState({ shippingOptions });
    };

    componentWillReceiveProps = async (nextProps) => {
        const { user } = nextProps;

        if (user) {
            const {
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode,
                changeFirstName,
                changeLastName,
                changeAddress,
                changeCity,
                changeState,
                changeZipCode,
            } = nextProps;
            const {
                address_1: userAddress,
                city: userCity,
                region: userState,
                postal_code: userZipCode,
            } = user;
            const [userFirstName, userLastName] = user.name.split(' ');

            if (!firstName && userFirstName) {
                changeFirstName(userFirstName);
            }
            if (!lastName && userLastName) {
                changeLastName(userLastName);
            }

            if (!address && userAddress) {
                changeAddress(userAddress);
            }

            if (!city && userCity) {
                changeCity(userCity);
            }

            if (!state && userState) {
                changeState(userState);
            }

            if (!zipCode && userZipCode) {
                changeZipCode(userZipCode);
            }
        }
    };

    handleChangeFirstName = (e) => {
        const { changeFirstName } = this.props;

        changeFirstName(e.target.value);
    };

    handleChangeLastName = (e) => {
        const { changeLastName } = this.props;

        changeLastName(e.target.value);
    };

    handleChangeAddress = (e) => {
        const { changeAddress } = this.props;

        changeAddress(e.target.value);
    };

    handleChangeCity = (e) => {
        const { changeCity } = this.props;

        changeCity(e.target.value);
    };

    handleChangeState = (e) => {
        const { changeState } = this.props;

        changeState(e.target.value);
    };

    handleChangeZipCode = (e) => {
        const { changeZipCode } = this.props;

        changeZipCode(e.target.value);
    };

    handleChangeShippingOptionId = (e) => {
        const { changeShippingOptionId } = this.props;

        changeShippingOptionId(e.target.value);
    };

    handleGoNext = async () => {
        const { address, city, state, zipCode, country, user } = this.props;

        const response = await TuringAPI.updateCustomerAddress({
            address_1: address,
            city,
            region: state || user.region,
            postal_code: zipCode,
            country: country || user.country,
            shipping_region_id: user.shipping_region_id,
        });

        console.log(response);
    };

    handleGoBack = () => {};

    render() {
        const {
            className,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            country,
            shippingOptionId,
        } = this.props;
        const {
            shippingOptions,
            btnPropsPrimary,
            btnPropsSecondary,
        } = this.state;

        return (
            <div className={className}>
                <DeliveryViewComponent
                    firstName={firstName}
                    lastName={lastName}
                    address={address}
                    city={city}
                    state={state}
                    zipCode={zipCode}
                    country={country}
                    shippingOptionId={shippingOptionId}
                    shippingOptions={shippingOptions}
                    onChangeAddress={this.handleChangeAddress}
                    onChangeCity={this.handleChangeCity}
                    onChangeFirstName={this.handleChangeFirstName}
                    onChangeLastName={this.handleChangeLastName}
                    onChangeState={this.handleChangeState}
                    onChangeZipCode={this.handleChangeZipCode}
                    onChangeCountry={this.handleChangeCountry}
                    onChangeShippingOptionId={this.handleChangeShippingOptionId}
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

DeliverView.propTypes = {
    className: PropTypes.string,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    shippingOptionId: PropTypes.number.isRequired,
    changeFirstName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeAddress: PropTypes.func.isRequired,
    changeCity: PropTypes.func.isRequired,
    changeZipCode: PropTypes.func.isRequired,
    changeState: PropTypes.func.isRequired,
    changeShippingOptionId: PropTypes.func.isRequired,
    user: PropTypes.shape({
        country: PropTypes.string,
        region: PropTypes.string,
        shipping_region_id: PropTypes.number,
    }),
};

DeliverView.defaultProps = {
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
)(DeliverView);
