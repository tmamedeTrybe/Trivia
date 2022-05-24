import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login, Game, Raking, Feedback } from './Pages';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/ranking" component={ Raking } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    );
  }
}

export default App;
