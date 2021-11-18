import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-calendar/dist/Calendar.css'
import './style.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {configureStore} from "./redux/store/configureStore";
import ScrollToTop from "./layout/ScrollToTop";
import {loadEvents} from "./features/events/eventRedux/eventActions";

const store = configureStore();
store.dispatch(loadEvents()); // store is being dispatched here.
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
