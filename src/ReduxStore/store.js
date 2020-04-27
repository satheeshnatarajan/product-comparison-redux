import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

let storeMiddleware = applyMiddleware(thunk);

if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    const { logger } = require('redux-logger');
    storeMiddleware = composeWithDevTools(applyMiddleware(thunk, logger));
}

const store = createStore(reducer, storeMiddleware);

export default store;
