import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Modal from '../../common/Modal';
import Register from '.';
import { closeRegisterModal } from '../Home/duck/actions';

const StyledModal = styled(Modal)`
    width: 100%;
    max-width: 360px;
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

const mapStateToProps = (state) => ({
    open: state.main.isRegisterModalOpen,
});

const mapDispatchToProps = {
    onClose: closeRegisterModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RegisterModal);
