import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './store/reducers/';
import './resources/css/styles.css';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Setting up redux dev tools.
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose) || compose;

// Create the redux store. Redux-thunk lets you execute async code, this is an alternative to redux-saga.
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(promiseMiddleware, thunkMiddleware)));

// React-redux is use to inject redux to react app.

const Apps = (props) => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App {...props} />
            </BrowserRouter>
        </Provider>
    );
};
            
ReactDOM.render(<Apps />, document.getElementById('root'));
