import React from 'react';

import ProductDetailComponent from './ProductDetailComponent';
import storiesOf from '../../../stories/stories-of';

storiesOf('ProductDetailComponent', module).add('default', () => (
    <ProductDetailComponent
        product={{
            name: "Arc d'Triomphe",
            description:
                'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
            price: '14.99',
            discounted_price: '0.00',
            product_id: 1,
            image: 'arc-d-triomphe.gif',
            image_2: 'arc-d-triomphe-2.gif',
        }}
        categories={['French']}
        rating={4}
        colorAttributes={[
            {
                attribute_name: 'Color',
                attribute_value_id: 14,
                attribute_value: 'Black',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 13,
                attribute_value: 'White',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 12,
                attribute_value: 'Red',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 11,
                attribute_value: 'Orange',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 10,
                attribute_value: 'Yellow',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 9,
                attribute_value: 'Green',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 8,
                attribute_value: 'Blue',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 7,
                attribute_value: 'Indigo',
            },
            {
                attribute_name: 'Color',
                attribute_value_id: 6,
                attribute_value: 'Purple',
            },
        ]}
        selectedColorAttribute={{
            attribute_name: 'Color',
            attribute_value_id: 14,
            attribute_value: 'Purple',
        }}
        sizeAttributes={[
            {
                attribute_name: 'Size',
                attribute_value_id: 1,
                attribute_value: 'S',
            },
            {
                attribute_name: 'Size',
                attribute_value_id: 2,
                attribute_value: 'M',
            },
            {
                attribute_name: 'Size',
                attribute_value_id: 3,
                attribute_value: 'L',
            },
            {
                attribute_name: 'Size',
                attribute_value_id: 4,
                attribute_value: 'XL',
            },
            {
                attribute_name: 'Size',
                attribute_value_id: 5,
                attribute_value: 'XXL',
            },
        ]}
        selectedSize={{
            attribute_name: 'Size',
            attribute_value_id: 3,
            attribute_value: 'L',
        }}
    />
));
