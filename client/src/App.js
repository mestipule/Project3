import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Intersections from "./pages/Intersections";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Intersections} />
          <Route exact path="/intersections" component={Intersections} />
          <Route exact path="/intersections/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
