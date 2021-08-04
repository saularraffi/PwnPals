import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BuildImageForm from './components/BuildImageForm'
import AppList from './components/AppList'

ReactDOM.render(
  <React.StrictMode>
    <BuildImageForm />
    <AppList />
  </React.StrictMode>,
  document.getElementById('root')
);
