import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test from './Test';
import logo from './logo.svg';
import './App.css';

function App (): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={Test}/>
      </Switch>
    </BrowserRouter>

  )
}

export default App;
