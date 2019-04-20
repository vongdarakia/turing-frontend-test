import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    display: flex;
    :hover {
        color: red;
    }
`;

const ProductCard = (props) => {
    const { product: { name, product_id } = {} } = props;
    return (
        <StyledLink to={`/product/${product_id}`}>
            <div>{name}</div>
        </StyledLink>
    );
};

export default ProductCard;
