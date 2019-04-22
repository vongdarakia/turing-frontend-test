import React from 'react';

import { storiesOf as libStoryOf } from '@storybook/react';
import MainStyles from '../styles/MainStyle';

export function createStoriesOf(label) {
    if (!label) {
        return (name) =>
            libStoryOf(name, module).addDecorator((storyFn) => (
                <MainStyles>{storyFn()}</MainStyles>
            ));
    }
    return (name) =>
        libStoryOf(`${label} - ${name}`, module).addDecorator((storyFn) => (
            <MainStyles>{storyFn()}</MainStyles>
        ));
}

const storiesOf = createStoriesOf();

export default storiesOf;
