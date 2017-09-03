import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter} from 'react-router-dom'
import {applyMiddleware,compose,createStore} from 'redux'

import reducer from './reducers'

import {Provider} from 'react-redux'

import thunk from 'redux-thunk'
import logger from 'redux-logger'

const composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__ || compose


const store=createStore(
    reducer,
    applyMiddleware(logger,thunk)
)

console.log(store.getState())

ReactDOM.render(
    <BrowserRouter >
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'))
registerServiceWorker()