import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import * as serviceWorker from './serviceWorker';
// import 'jquery/dist/jquery.slim.min'
// import 'select2/dist/css/select2.min.css'
// import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/js/dist'
// import 'react-bootstrap/dist/react-bootstrap.min'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
