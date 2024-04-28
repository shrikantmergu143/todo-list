import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
const App = React.lazy(()=>import('./App'));

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<React.Fragment/>}>
      <Router>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <App/>
              </PersistGate>
          </Provider>
      </Router>
  </Suspense>
);


serviceWorkerRegistration.register();
reportWebVitals();