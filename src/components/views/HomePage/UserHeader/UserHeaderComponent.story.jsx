import React from 'react';
import { withRouter } from 'react-router-dom';
import StoryRouter from 'storybook-react-router';

import UserHeaderComponent from './UserHeaderComponent';
import storiesOf from '../../../../stories/stories-of';

const UserHeaderComponentWithRouter = withRouter(UserHeaderComponent);

storiesOf('UserHeaderComponent', module)
    .addDecorator(StoryRouter())
    .add('default', () => <UserHeaderComponentWithRouter numItems={1} />);
