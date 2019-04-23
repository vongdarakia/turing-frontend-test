import React from 'react';

import ProductCard from '.';
import storiesOf from '../../../stories/stories-of';

storiesOf('ProductCard', module).add('default', () => (
    <React.Fragment>
        <ProductCard
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
        />

        <ProductCard
            product={{
                name: "Arc d'Triomphe and more words",
                description:
                    'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
                price: '14.99',
                discounted_price: '0.00',
                product_id: 1,
                image: 'arc-d-triomphe.gif',
                image_2: 'arc-d-triomphe-2.gif',
            }}
        />

        <ProductCard
            product={{
                name: "Arc d'Triomphe and more words and more words",
                description:
                    'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
                price: '14.99',
                discounted_price: '0.00',
                product_id: 1,
                image: 'arc-d-triomphe.gif',
                image_2: 'arc-d-triomphe-2.gif',
            }}
        />

        <ProductCard
            product={{
                name: "Arc d'Triomphe and more words",
                description:
                    'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
                price: '14.99',
                discounted_price: '3.00',
                product_id: 1,
                image: 'arc-d-triomphe.gif',
                image_2: 'arc-d-triomphe-2.gif',
            }}
        />

        <ProductCard
            product={{
                name: "Arc d'Triomphe and more words and more words",
                description:
                    'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
                price: '14.99',
                discounted_price: '13.00',
                product_id: 1,
                image: 'arc-d-triomphe.gif',
                image_2: 'arc-d-triomphe-2.gif',
            }}
        />
    </React.Fragment>
));
