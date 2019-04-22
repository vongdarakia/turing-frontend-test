import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

const Wrapper = styled.div`
    margin: 12px 0;
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
`;

const FormInputGroup = (props) => {
    const {
        label,
        inputProps: { id, className },
        inputProps,
    } = props;

    return (
        <Wrapper className="form-input-group">
            {label && (
                <InputLabel className="form-label" htmlFor={id}>
                    {label}
                </InputLabel>
            )}

            <InputBase
                {...inputProps}
                className={`form-input ${className || ''}`}
            />
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
    label: PropTypes.string.isRequired,
};

export default FormInputGroup;
