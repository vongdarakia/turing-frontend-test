import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../../common/Button';

const Wrapper = styled.div`
    text-align: center;
    padding: 48px 0;

    #btn-back-to-shop {
        margin: 48px 0 32px 0;
    }
`;

const SuccessViewComponent = (props) => {
    const { onClickBackToShop } = props;

    return (
        <Wrapper id="success-view" className="checkout-view">
            <h1>Success!</h1>
            <div>
                Your items will be shipped shortly, you will get email with
                details.
            </div>
            <Button
                id="btn-back-to-shop"
                className="btn-large primary"
                onClick={onClickBackToShop}
            >
                Back to shop
            </Button>
        </Wrapper>
    );
};

SuccessViewComponent.propTypes = {
    onClickBackToShop: PropTypes.func.isRequired,
};

export default SuccessViewComponent;
