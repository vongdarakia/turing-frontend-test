import React from 'react';

const CategoryListItem = (props) => {
    const { category, onClick } = props;

    return (
        <button type="button" onClick={onClick}>
            {category.name}
        </button>
    );
};

export default CategoryListItem;
