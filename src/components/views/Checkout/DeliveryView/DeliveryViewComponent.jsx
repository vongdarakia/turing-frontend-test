import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import FormInputGroup from '../../../common/form/FormInputGroup';

const Wrapper = styled.div`
    .form-address {
        display: flex;
        flex-direction: column;

        .form-row {
            display: flex;
        }

        .form-col {
            width: 50%;
            border-color: #b4b4b4;
            box-sizing: border-box;
        }

        .col-left {
            padding-right: 8px;
        }

        .col-right {
            padding-left: 8px;
        }
    }

    .form-delivery-options {
        display: flex;
        flex-direction: column;
    }

    .radio-group-delivery-options {
        display: flex;
        flex-direction: row;
    }

    .delivery-options-section {
        margin-bottom: 24px;
    }
`;

const DeliveryViewComponent = (props) => {
    const {
        firstName,
        lastName,
        address,
        city,
        state,
        zipCode,
        country,
        shippingOptions,
        shippingOptionId,
        onChangeAddress,
        onChangeCity,
        onChangeFirstName,
        onChangeLastName,
        onChangeState,
        onChangeZipCode,
        onChangeCountry,
        onChangeShippingOptionId,
    } = props;

    return (
        <Wrapper id="delivery-view" className="checkout-view">
            <div className="form-address">
                <div className="form-row">
                    <div className="form-col col-left">
                        <FormInputGroup
                            id="first-name"
                            label="First name"
                            name="firstName"
                            value={firstName}
                            onChange={onChangeFirstName}
                        />
                    </div>
                    <div className="form-col col-right">
                        <FormInputGroup
                            id="last-name"
                            label="Last name"
                            name="lastName"
                            value={lastName}
                            onChange={onChangeLastName}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col col-left">
                        <FormInputGroup
                            id="address"
                            label="Address"
                            name="address"
                            value={address}
                            onChange={onChangeAddress}
                        />
                    </div>
                    <div className="form-col col-right">
                        <FormInputGroup
                            id="city"
                            label="City"
                            name="city"
                            value={city}
                            onChange={onChangeCity}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col col-left">
                        <FormInputGroup
                            id="state"
                            label="State"
                            name="state"
                            value={state}
                            onChange={onChangeState}
                        />
                    </div>
                    <div className="form-col col-right">
                        <FormInputGroup
                            id="zipCode"
                            label="ZIP code"
                            name="zipCode"
                            value={zipCode}
                            onChange={onChangeZipCode}
                        />
                    </div>
                </div>
            </div>

            <div className="form-address">
                <div className="form-col col-left">
                    <FormInputGroup
                        id="country"
                        label="Country"
                        name="country"
                        value={country}
                        onChange={onChangeCountry}
                        disabled
                    />
                </div>
            </div>

            <div className="delivery-options-section">
                <h2>Delivery options</h2>

                {shippingOptions.length > 0 && (
                    <FormControl
                        className="form-delivery-options"
                        component="fieldset"
                    >
                        <RadioGroup
                            className="radio-group-delivery-options"
                            aria-label="Delivery Options"
                            name="deliveryOptions"
                            value={`${shippingOptionId}`}
                            onChange={onChangeShippingOptionId}
                        >
                            {shippingOptions.map((option) => (
                                <FormControlLabel
                                    key={option.shipping_id}
                                    label={option.shipping_type}
                                    value={`${option.shipping_id}`}
                                    control={<Radio />}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
                {shippingOptions.length === 0 && (
                    <div>There are no shipping options</div>
                )}
            </div>
        </Wrapper>
    );
};

DeliveryViewComponent.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    shippingOptions: PropTypes.arrayOf(
        PropTypes.shape({
            shipping_id: PropTypes.number,
            shipping_type: PropTypes.string,
        }),
    ),
    shippingOptionId: PropTypes.number,
    onChangeAddress: PropTypes.func.isRequired,
    onChangeCity: PropTypes.func.isRequired,
    onChangeFirstName: PropTypes.func.isRequired,
    onChangeLastName: PropTypes.func.isRequired,
    onChangeState: PropTypes.func.isRequired,
    onChangeZipCode: PropTypes.func.isRequired,
    onChangeCountry: PropTypes.func,
    onChangeShippingOptionId: PropTypes.func.isRequired,
};

DeliveryViewComponent.defaultProps = {
    shippingOptions: [],
    shippingOptionId: undefined,
    onChangeCountry: undefined,
};

export default DeliveryViewComponent;
