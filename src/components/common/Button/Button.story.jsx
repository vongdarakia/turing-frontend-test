import React from 'react';

import Button from './index';
import storiesOf from '../../../stories/stories-of';

storiesOf('Button', module).add('default', () => (
    <div>
        <Button>Default</Button>
        <Button className="primary">Primary</Button>
        <Button className="secondary">Secondary</Button>
        <Button className="primary btn-large">Large</Button>
    </div>
));
