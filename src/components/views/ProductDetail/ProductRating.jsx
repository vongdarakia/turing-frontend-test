import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@material-ui/core/Icon';

const MAX_RATING = 5;

const Wrapper = styled.div`
    display: flex;
    color: #b4b4b4;
    .gold-rating {
        color: #f1ad3d;
    }
`;

const ProductRating = (props) => {
    const { rating } = props;
    const ratings = [];

    for (let index = 0; index < rating && index < MAX_RATING; index += 1) {
        ratings.push(
            <Icon key={`rating-${index}`} className="gold-rating">
                star_rate_icon
            </Icon>,
        );
    }

    for (let index = rating; index < MAX_RATING; index += 1) {
        ratings.push(
            <Icon key={`rating-${index}`} className="empty-rating">
                star_rate_icon
            </Icon>,
        );
    }

    return <Wrapper className="product-rating">{ratings}</Wrapper>;
};

ProductRating.propTypes = {
    rating: PropTypes.number,
};

ProductRating.defaultProps = {
    rating: 0,
};

export default ProductRating;
