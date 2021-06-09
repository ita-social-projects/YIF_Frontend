import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from './services/tokenValidator';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
