import React from 'react';

import CartComponent from './CartComponent';
import storiesOf from '../../../stories/stories-of';

storiesOf('CartComponent', module).add('default', () => (
    <CartComponent
        cart={[
            { name: 'a', price: 23.99, quantity: 2, attributes: 'LG, red' },
            { name: 'b', price: 23.99, quantity: 4, attributes: 'X, blue' },
            { name: 'c', price: 23.99, quantity: 0, attributes: 'S, green' },
        ]}
    />
));
