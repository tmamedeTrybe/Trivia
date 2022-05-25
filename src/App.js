import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import './App.css';
import Game from './Pages/Game';
import Ranking from './Pages/Ranking';
import Feedback from './Pages/Feedback';
import Settings from './Pages/Settings';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route exact path="/ranking" component={ Ranking } />
        <Route exact path="/feedback" component={ Feedback } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default App;
