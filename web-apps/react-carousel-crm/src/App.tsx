import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LeftNavBar, LeftNavBarProps } from '@hs/ui-components';
import { DashBoardIcon, CreateIcon } from '@hs/icons';

import './App.css';
import DashBoard from './components/dashboard/DashBoard';
import CarouselCreator from './components/creator/CarouselCreator';
function App() {
  const navItems: LeftNavBarProps = {
    navList: [
      { linkUrl: 'dashboard', linkText: 'Dashboard', icon: DashBoardIcon },
      { linkUrl: 'create-carousel', linkText: 'Create', icon: CreateIcon },
    ],
  };
  return (
    <div className="App">
      <Router>
        <LeftNavBar {...navItems}></LeftNavBar>
        <Switch>
          <Route path="/dashboard">
            <DashBoard />
          </Route>
          <Route path="/create-carousel">
            <CarouselCreator />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
