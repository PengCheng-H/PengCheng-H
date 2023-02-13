import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import HCRouter from './router';


class HCApp extends Component {
  run() {
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );

    root.render(
      <React.StrictMode>
        <HCRouter />
      </React.StrictMode>
    );
  }
}

const app = new HCApp({});
app.run();