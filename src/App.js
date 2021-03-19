import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from './pages/index';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={Index} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;