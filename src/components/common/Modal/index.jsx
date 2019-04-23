import React from 'react';
import styled from 'styled-components';

import MaterialModal from '@material-ui/core/Modal';
import MainStyles from '../../../styles/MainStyle';

const ModalStyle = styled(MainStyles)`
    background-color: white;
    max-width: 760px;
    margin: auto;
    margin-top: 48px;
`;

const Modal = (props) => {
    const { children } = props;

    return (
        <MaterialModal {...props}>
            <ModalStyle>{children}</ModalStyle>
        </MaterialModal>
    );
};

export default Modal;
