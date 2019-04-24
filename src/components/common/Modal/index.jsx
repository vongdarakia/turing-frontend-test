import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MaterialModal from '@material-ui/core/Modal';
import MainStyles from '../../../styles/MainStyle';

const ModalStyle = styled(MainStyles)`
    overflow: auto;
    background-color: white;
    max-width: 760px;
    width: 100%;
    margin: 24px auto;
`;

const Modal = (props) => {
    const { children, className } = props;

    return (
        <MaterialModal {...props} className="modal">
            <ModalStyle className={className}>{children}</ModalStyle>
        </MaterialModal>
    );
};

Modal.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Modal.defaultProps = {
    className: undefined,
    children: undefined,
};

export default Modal;
