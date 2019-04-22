/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';

const Wrapper = styled.div`
    background-color: #efefef;
    padding: 24px 0;

    .view-footer-btn-container {
        display: flex;
        justify-content: space-between;
        padding: 0 18px;
    }
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
            <div className="view-footer-btn-container">
                <Button {...btnPropsSecondary} className={btnClassSecondary}>
                    {labelSecondary}
                </Button>
                <Button {...btnPropsPrimary} className={btnClassPrimary}>
                    {labelPrimary}
                </Button>
            </div>
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
