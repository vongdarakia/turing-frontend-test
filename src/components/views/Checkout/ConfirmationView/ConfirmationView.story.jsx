import React from 'react';

import ConfirmationViewComponent from './ConfirmationViewComponent';
import storiesOf from '../../../../stories/stories-of';

storiesOf('ConfirmationViewComponent', module).add('default', () => (
    <ConfirmationViewComponent
        cart={[
            { name: 'a', subtotal: 23.99, quantity: 2 },
            { name: 'a', subtotal: 23.99, quantity: 2 },
            { name: 'a', subtotal: 23.99, quantity: 2 },
        ]}
        address="1900 Embarcadero Road"
        city="Palo Alto"
        state="CA"
        zipCode="94303"
        country="United States"
        shippingOption={{
            shipping_type: 'Standard Delivery (free, 2-3 days)',
            shipping_cost: 0,
        }}
        subtotal={23.99 * 6}
        grandTotal={23.99 * 6}
    />
));
