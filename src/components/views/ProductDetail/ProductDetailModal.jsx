import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../common/Modal';
import ProductDetail from '.';
import { closeProductDetailModal } from '../Home/duck/actions';

const ProductDetailModal = (props) => {
    const { open, onClose, productId } = props;

    return (
        <Modal open={open} onClose={onClose}>
            <ProductDetail productId={productId} />
        </Modal>
    );
};

ProductDetailModal.propTypes = {
    productId: PropTypes.number,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

ProductDetailModal.defaultProps = {
    productId: undefined,
};

const mapStateToProps = (state) => ({
    open: state.main.isProductDetailModalOpen,
    productId: state.main.selectedProductId,
});

const mapDispatchToProps = {
    onClose: closeProductDetailModal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductDetailModal);
