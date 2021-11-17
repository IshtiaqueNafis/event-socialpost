import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './style.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "./redux/store/configureStore";
import ScrollToTop from "./layout/ScrollToTop";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <ScrollToTop/>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);


serviceWorkerRegistration.unregister();


reportWebVitals();
