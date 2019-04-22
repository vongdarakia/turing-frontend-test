import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Modal from '../../common/Modal';
import Login from '.';

const StyledModal = styled(Modal)`
    width: 100%;
    max-width: 360px;
    margin: auto;
`;

const LoginModal = (props) => {
    const { open, onClose } = props;

    return (
        <StyledModal open={open} onClose={onClose}>
            <Login onLogin={onClose} onLoginWithFacebook={onClose} />
        </StyledModal>
    );
};

LoginModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LoginModal;
