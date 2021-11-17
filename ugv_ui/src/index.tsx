import React from 'react';
import ReactDOM from 'react-dom';
import { createApp } from './Components/App/create';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './index.scss';

const { AppElement } = createApp();

ReactDOM.render(
  <React.StrictMode>
    <AppElement />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
