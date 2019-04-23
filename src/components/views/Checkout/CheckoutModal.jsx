import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import Modal from '../../common/Modal';
import Checkout from '.';
import { closeCheckoutModal } from '../HomePage/duck/actions';

const Wrapper = styled.div`
    position: relative;

    .checkout-view,
    .view-footer-btn-container {
        max-width: 680px;
        margin: auto;
    }

    .btn-close-modal {
        box-shadow: none;
        background-color: transparent;
        position: absolute;
        top: 4px;
        right: 4px;

        .close-modal-icon {
            font-size: 36px;
        }
    }
`;

const CheckoutModal = (props) => {
    const { open, onClose } = props;

    return (
        <Modal open={open} onClose={onClose}>
            <Wrapper id="checkout-modal-view">
                <Fab
                    aria-label="Close"
                    className="btn-close-modal"
                    onClick={onClose}
                >
                    <Icon className="icon close-modal-icon">clear_icon</Icon>
                </Fab>
                <Checkout />
            </Wrapper>
        </Modal>
    );
};

CheckoutModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    open: state.main.isCheckoutModalOpen,
});

const mapDispatchToProps = {
    onClose: closeCheckoutModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CheckoutModal);
