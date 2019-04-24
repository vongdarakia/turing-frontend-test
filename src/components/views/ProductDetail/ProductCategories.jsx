import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #b4b4b4;
    font-size: 14px;
    font-weight: 400;

    .bullet {
        font-size: 18px;
        font-weight: bold;
        margin: 0 8px;
        line-height: 4px;
    }
`;

const ProductCategories = (props) => {
    const { categories = [], selectedDepartment } = props;
    const allCategories = selectedDepartment;

    return (
        <Wrapper className="product-categories">
            <span className="product-category">Home</span>
            <span className="bullet">&bull;</span>
            <span className="product-category">{allCategories}</span>
            {categories.length > 0 && <span className="bullet">&bull;</span>}
            {categories.map((category, index) => (
                <React.Fragment key={category}>
                    <span className="product-category">{category}</span>
                    {index < categories.length - 1 && (
                        <span className="bullet">&bull;</span>
                    )}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};

ProductCategories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string),
    selectedDepartment: PropTypes.string,
};

ProductCategories.defaultProps = {
    categories: [],
    selectedDepartment: 'All Categories',
};

export default ProductCategories;
