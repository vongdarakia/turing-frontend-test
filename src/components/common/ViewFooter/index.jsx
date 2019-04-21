/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

const Wrapper = styled.div`
    background-color: #efefef;
    padding: 24px 0;
    display: flex;
    justify-content: space-between;
`;

const ViewFooter = (props) => {
    const {
        className,
        labelPrimary,
        labelSecondary,
        btnPropsSecondary: { className: btnClassSecondary = 'secondary' } = {},
        btnPropsSecondary,
        btnPropsPrimary: { className: btnClassPrimary = 'primary' } = {},
        btnPropsPrimary,
    } = props;

    return (
        <Wrapper className={`view-footer ${className || ''}`}>
            <Button {...btnPropsSecondary} className={btnClassSecondary}>
                {labelSecondary}
            </Button>
            <Button {...btnPropsPrimary} className={btnClassPrimary}>
                {labelPrimary}
            </Button>
        </Wrapper>
    );
};

ViewFooter.propTypes = {
    className: PropTypes.string,
    labelPrimary: PropTypes.string.isRequired,
    labelSecondary: PropTypes.string.isRequired,
    btnPropsPrimary: PropTypes.object,
    btnPropsSecondary: PropTypes.object,
};

ViewFooter.defaultProps = {
    className: undefined,
    btnPropsPrimary: undefined,
    btnPropsSecondary: undefined,
};

export default ViewFooter;
