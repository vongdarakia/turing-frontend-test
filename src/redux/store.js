import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './root-reducer';

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    );
};

const store = configureStore();

export default store;
