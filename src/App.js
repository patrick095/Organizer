import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from './pages/index';
import Login from './pages/login';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;