import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import AppWithReduser from './AppWithReduser';
import { Provider } from 'react-redux';
import { store } from './redusers/state';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <Provider store={store}>
    <AppWithReduser />
  </Provider>
);


