import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PRIMARY_COLOR } from '../../../styles/settings';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #b4b4b4;
    font-size: 14px;
    font-weight: 400;

    .size-title {
        color: #b4b4b4;
        margin: 0;
    }

    .size-list {
        display: flex;
        flex-direction: row;
        margin: 8px 0;
    }

    .size-container {
        color: #6c6c6c;
        font-size: smaller;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        width: 50px;
        height: 25px;
        cursor: pointer;
        box-sizing: border-box;
        background-color: #e7e7e7;
        margin-right: 12px;

        &.selected,
        :hover {
            background-color: ${PRIMARY_COLOR};
            color: white;
        }
    }
`;

const ProductSizes = (props) => {
    const {
        sizeAttributes = [],
        selectedSizeAttribute: { attribute_value: selectedSize } = {},
        onClickSize,
    } = props;

    return (
        <Wrapper className="product-sizes">
            <h3 className="size-title">Size</h3>
            <div className="size-list">
                {sizeAttributes.map((sizeAttribute) => {
                    const { attribute_value: size } = sizeAttribute;
                    return (
                        <div
                            key={size}
                            className={`size-container ${
                                size === selectedSize ? 'selected' : ''
                            }`}
                            onClick={() => {
                                onClickSize(sizeAttribute);
                            }}
                        >
                            {size}
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
};

ProductSizes.propTypes = {
    sizeAttributes: PropTypes.arrayOf(
        PropTypes.shape({
            attribute_value: PropTypes.string,
            attribute_value_id: PropTypes.number,
        }),
    ),
    selectedSizeAttribute: PropTypes.shape({
        attribute_value: PropTypes.string,
        attribute_value_id: PropTypes.number,
    }),
    onClickSize: PropTypes.func.isRequired,
};

ProductSizes.defaultProps = {
    sizeAttributes: [],
    selectedSizeAttribute: {},
};

export default ProductSizes;
