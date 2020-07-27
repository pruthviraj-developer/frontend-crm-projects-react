import React from 'react';
import './App.css';
import { Thing2, TestButton, LeftNavBar } from '@hs/ui-components';
function App() {
  return (
    <div className="App">
      <LeftNavBar></LeftNavBar>
      <Thing2></Thing2>
      <TestButton />
    </div>
  );
}

export default App;
