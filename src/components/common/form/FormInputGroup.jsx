import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

const Wrapper = styled.div`
    margin: 4px 0;
    text-align: left;

    .form-label {
        color: #b7b7b7;
        font-size: 15px;
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
    }

    .form-input {
        display: block;
        width: 100%;
        margin-top: 4px;
        color: #6c6c6c;

        input {
            font-family: 'Open Sans', sans-serif;
            font-size: 16px;
            border-radius: 4px;
            position: relative;
            background-color: white;
            border: 1px solid #ced4da;
            box-sizing: border-box;
            padding: 10px 26px 10px 12px;
            height: fit-content;
        }
    }

    &.error {
        .form-label,
        input {
            color: #f44336;
            border-color: #f44336;
        }
    }
`;

const FormInputGroup = (props) => {
    const {
        label,
        required,
        error,
        inputProps: { id, className: inputClass },
        inputProps,
    } = props;
    const errorClass = error ? 'error' : '';
    const className = `form-input ${inputClass || ''} ${errorClass}`;

    return (
        <Wrapper className={`form-input-group ${errorClass}`}>
            {label && (
                <InputLabel className="form-label" htmlFor={id}>
                    {`${label} ${required ? '*' : ''}`}
                </InputLabel>
            )}

            <InputBase {...inputProps} className={className} />
        </Wrapper>
    );
};

FormInputGroup.propTypes = {
    inputProps: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        placeholder: PropTypes.string,
        type: PropTypes.string,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
    }).isRequired,
    label: PropTypes.string,
    error: PropTypes.bool,
    required: PropTypes.bool,
};

FormInputGroup.defaultProps = {
    label: undefined,
    error: false,
    required: false,
};

export default FormInputGroup;
