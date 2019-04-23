import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../../common/Modal';
import Register from '.';

const StyledModal = styled(Modal)`
    width: 100%;
    max-width: 360px;
    margin: auto;
`;

const RegisterModal = (props) => {
    const { open, onClose } = props;

    return (
        <StyledModal open={open} onClose={onClose}>
            <Register onRegister={onClose} onRegisterWithFacebook={onClose} />
        </StyledModal>
    );
};

RegisterModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default RegisterModal;
