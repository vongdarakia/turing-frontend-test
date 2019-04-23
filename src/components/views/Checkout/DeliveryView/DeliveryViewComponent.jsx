import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import FormInputGroup from '../../../common/form/FormInputGroup';

const Wrapper = styled.div`
    padding: 0 18px;
    padding-top: 48px;

    hr {
        border: none;
        margin-top: 48px;
        margin-bottom: 16px;
        height: 2px;
        background-color: #e4e4e4;
    }
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
            <h2>Shipping Address</h2>
            <div className="form-address">
                <div className="form-row">
                    <div className="form-col col-left">
                        <FormInputGroup
                            required
                            label="First name"
                            inputProps={{
                                id: 'first-name',
                                name: 'firstName',
                                value: firstName,
                                onChange: onChangeFirstName,
                            }}
                        />
                    </div>
                    <div className="form-col col-right">
                        <FormInputGroup
                            required
                            label="Last name"
                            inputProps={{
                                id: 'last-name',
                                name: 'lastName',
                                value: lastName,
                                onChange: onChangeLastName,
                            }}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col col-left">
                        <FormInputGroup
                            required
                            label="Address"
                            inputProps={{
                                id: 'address',
                                name: 'address',
                                value: address,
                                onChange: onChangeAddress,
                            }}
                        />
                    </div>
                    <div className="form-col col-right">
                        <FormInputGroup
                            required
                            label="City"
                            inputProps={{
                                id: 'city',
                                name: 'city',
                                value: city,
                                onChange: onChangeCity,
                            }}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-col col-left">
                        <FormInputGroup
                            required
                            label="State"
                            inputProps={{
                                id: 'state',
                                name: 'state',
                                value: state,
                                onChange: onChangeState,
                            }}
                        />
                    </div>
                    <div className="form-col col-right">
                        <FormInputGroup
                            required
                            label="ZIP code"
                            inputProps={{
                                id: 'zipCode',
                                name: 'zipCode',
                                value: zipCode,
                                onChange: onChangeZipCode,
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="form-address">
                <div className="form-col col-left">
                    <FormInputGroup
                        required
                        label="Country"
                        inputProps={{
                            id: 'country',
                            name: 'country',
                            value: country,
                            onChange: onChangeCountry,
                            disabled: true,
                        }}
                    />
                </div>
            </div>

            <hr />

            <div className="delivery-options-section">
                <h2>Delivery Options</h2>

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
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    country: PropTypes.string,
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
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    shippingOptions: [],
    shippingOptionId: undefined,
    onChangeCountry: undefined,
};

export default DeliveryViewComponent;
