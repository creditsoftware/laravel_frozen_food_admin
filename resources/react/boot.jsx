import 'regenerator-runtime/runtime';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import './boot.scss';

import React from 'react';
window.React = React;

let booted = false;

export default (App, ducks = null) => {
    if(booted) return;

    if (ducks) {
        const store = initStore(ducks);
        render(<Provider store={store}><App/></Provider>, document.querySelector('#app-container'));
    } else
        render(<App/>, document.querySelector('#app-container'));

    booted = true;
}

function lookupReducer(handlers, init) {

    return (state = init, action) => {
        if (action.type in handlers)
            return handlers[action.type](state, action);
        return state;
    };
}

function initStore(ducks) {
    const sagas = [];
    const reducers = {};

    for (const k in ducks) {
        const {init, handlers, saga} = ducks[k];
        if (!init) throw `missing init for duck: ${k}`;
        if (saga) sagas.push(saga());
        reducers[k] = lookupReducer(handlers, init);
    }

    /* eslint-disable no-underscore-dangle */
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMw = createSagaMiddleware();
    const store = createStore(combineReducers(reducers), composeEnhancer(applyMiddleware(sagaMw)));
    sagaMw.run(function* () {
        yield all(sagas);
    });
    return store;
}
