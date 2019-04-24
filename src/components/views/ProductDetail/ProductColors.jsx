import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getShopmateColor from '../../../utils/shopmate-colors';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #b4b4b4;
    font-size: 14px;
    font-weight: 400;

    .color-title {
        color: #b4b4b4;
        margin: 0;
    }

    .color-list {
        display: flex;
        flex-direction: row;
        margin: 8px 0;
    }

    .color-container {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        cursor: pointer;
        box-sizing: border-box;

        &.selected,
        :hover {
            border: 1px solid #b4b4b4;
        }
    }
`;

const Color = styled.div`
    border-radius: 50%;
    width: 12px;
    height: 12px;
    box-sizing: border-box;
    background-color: ${({ color }) => color};
    ${({ color }) =>
        color === 'white' ||
        color === '#fff' ||
        color === '#ffffff' ||
        color === '#f7f7f7'
            ? 'border: 1px solid #e2e2e2;'
            : ''};
`;

const ProductColors = (props) => {
    const {
        colorAttributes = [],
        selectedColorAttribute: { attribute_value: selectedColor = '' } = {},
        onClickColor,
    } = props;

    return (
        <Wrapper
            className="product-colors"
            selectedColor={getShopmateColor(selectedColor)}
        >
            <h3 className="color-title">Color</h3>
            <div className="color-list">
                {colorAttributes.map((colorAttribute) => {
                    const { attribute_value: color } = colorAttribute;

                    return (
                        <div
                            key={color}
                            className={`color-container ${
                                color === selectedColor ? 'selected' : ''
                            }`}
                            onClick={() => {
                                onClickColor(colorAttribute);
                            }}
                        >
                            <Color
                                className="color"
                                color={getShopmateColor(color)}
                            />
                        </div>
                    );
                })}
            </div>
        </Wrapper>
    );
};

ProductColors.propTypes = {
    colorAttributes: PropTypes.arrayOf(
        PropTypes.shape({
            attribute_value: PropTypes.string,
            attribute_value_id: PropTypes.number,
        }),
    ),
    selectedColorAttribute: PropTypes.shape({
        attribute_value: PropTypes.string,
        attribute_value_id: PropTypes.number,
    }),
    onClickColor: PropTypes.func.isRequired,
};

ProductColors.defaultProps = {
    colorAttributes: [],
    selectedColorAttribute: {},
};

export default ProductColors;
