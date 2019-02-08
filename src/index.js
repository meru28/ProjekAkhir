import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './support/fontawesome-free/css/fontawesome.min.css';
import './support/fontawesome-free/css/all.css';
import './support/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './support/fonts/iconic/css/material-design-iconic-font.min.css';
import './support/vendor/animate/animate.css';
import './support/css/util.css';
import './support/css/main1.css';
import './support/css/agency.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 

//cara menggunakan middleware yaitu di parameter ketiga, untuk parameter kedua biasanya enhancer
//utk melakukan proses asynchronous hrs menggunakan redux thunk

ReactDOM.render(
    //bikin store utk diakses ke semua komponen
    //yg di dlm store adalah reducers & global state
    <Provider store = {store}>
        <BrowserRouter>
             <App />
        </BrowserRouter>
    </Provider>, 
        document.getElementById('root'));
        console.log(store.getState())

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
