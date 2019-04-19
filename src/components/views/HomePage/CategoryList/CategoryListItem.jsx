import React from 'react';

const CategoryListItem = (props) => {
    const { category } = props;

    return <div>{category.name}</div>;
};

export default CategoryListItem;
