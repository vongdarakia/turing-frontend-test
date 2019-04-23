import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Modal from '../../common/Modal';
import Login from '.';
import { closeLoginModal } from '../HomePage/duck/actions';

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

const mapStateToProps = (state) => ({
    open: state.main.isLoginModalOpen,
});

const mapDispatchToProps = {
    onClose: closeLoginModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginModal);
