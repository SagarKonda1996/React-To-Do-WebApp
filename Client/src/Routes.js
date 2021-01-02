import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home'
const RouterOutlet = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/:label" exact component={Home}/>

    </Switch>
  );
};

export default RouterOutlet;
