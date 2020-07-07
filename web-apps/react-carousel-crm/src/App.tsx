import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Thing2, Thing, TestButton } from '@hs/ui-components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.tsx</code>
          and save to reload.
        </p>

        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        <Thing></Thing>
        <Thing2></Thing2>
        <TestButton />
      </header>
    </div>
  );
}

export default App;
