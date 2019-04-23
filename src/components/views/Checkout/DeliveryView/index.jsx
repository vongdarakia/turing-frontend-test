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

        const {
            onClickBack,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            country,
        } = props;

        this.state = {
            shippingOptions: [],
            btnPropsPrimary: {
                onClick: this.handleGoNext,
                disabled: !this.isFormValid({
                    firstName,
                    lastName,
                    address,
                    city,
                    state,
                    zipCode,
                    country,
                }),
            },
            btnPropsSecondary: {
                onClick: onClickBack,
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
        const {
            user,
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            country,
        } = nextProps;
        const {
            firstName: prevFirstName,
            lastName: prevLastName,
            address: prevAddress,
            city: prevCity,
            state: prevState,
            zipCode: prevZipCode,
            country: prevCountry,
        } = this.props;

        if (user) {
            const {
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

        if (
            firstName !== prevFirstName ||
            lastName !== prevLastName ||
            address !== prevAddress ||
            city !== prevCity ||
            state !== prevState ||
            zipCode !== prevZipCode ||
            country !== prevCountry
        ) {
            this.validateForm({
                firstName,
                lastName,
                address,
                city,
                state,
                zipCode,
                country,
            });
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
        const {
            address,
            city,
            state,
            zipCode,
            country,
            user,
            onClickNext,
        } = this.props;

        if (user) {
            const response = await TuringAPI.updateCustomerAddress({
                address_1: address || user.address_1,
                city: city || user.city,
                region: state || user.region,
                postal_code: zipCode || user.postal_code,
                country: country || user.country,
                shipping_region_id: user.shipping_region_id,
            });
            console.log(response);
        }

        onClickNext();
    };

    handleGoBack = () => {};

    isFormValid = ({
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        country,
    }) => {
        return !!(
            firstName &&
            lastName &&
            address &&
            city &&
            state &&
            zipCode &&
            country
        );
    };

    validateForm = (formData) => {
        const {
            firstName,
            lastName,
            address,
            city,
            state,
            zipCode,
            country,
            btnPropsPrimary,
        } = this.state;

        this.setState({
            btnPropsPrimary: {
                ...btnPropsPrimary,
                disabled: !this.isFormValid({
                    firstName,
                    lastName,
                    address,
                    city,
                    state,
                    zipCode,
                    country,
                    ...formData,
                }),
            },
        });
    };

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
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string,
    shippingOptionId: PropTypes.number.isRequired,
    changeFirstName: PropTypes.func.isRequired,
    changeLastName: PropTypes.func.isRequired,
    changeAddress: PropTypes.func.isRequired,
    changeCity: PropTypes.func.isRequired,
    changeZipCode: PropTypes.func.isRequired,
    changeState: PropTypes.func.isRequired,
    changeShippingOptionId: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    onClickBack: PropTypes.func.isRequired,
    user: PropTypes.shape({
        country: PropTypes.string,
        region: PropTypes.string,
        shipping_region_id: PropTypes.number,
    }),
};

DeliverView.defaultProps = {
    className: undefined,
    firstName: undefined,
    lastName: undefined,
    address: undefined,
    city: undefined,
    state: undefined,
    zipCode: undefined,
    country: undefined,
    user: undefined,
};

const mapStateToProps = ({ checkout, main: { user } }) => {
    const {
        name: userName = '',
        address_1: userAddress,
        city: userCity,
        region: userState,
        postal_code: userZipCode,
        country: userCountry,
    } = user || {};
    const [userFirstName, userLastName] = userName;

    return {
        firstName: checkout.firstName || userFirstName,
        lastName: checkout.lastName || userLastName,
        address: checkout.address || userAddress,
        city: checkout.city || userCity,
        state: checkout.state || userState,
        zipCode: checkout.zipCode || userZipCode,
        country: checkout.country || userCountry,
        shippingOptionId: checkout.shippingOptionId,
        addressForm: checkout,
        user,
    };
};

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
