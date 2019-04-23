import React from 'react';
import { withRouter } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import HeaderComponent from './HeaderComponent';
import storiesOf from '../../../../stories/stories-of';

const HeaderComponentWithRouter = withRouter(HeaderComponent);

storiesOf('HeaderComponent', module)
    .addDecorator(StoryRouter())
    .add('default', () => <HeaderComponentWithRouter numItems={1} />);
