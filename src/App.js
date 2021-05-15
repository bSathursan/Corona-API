import React from "react";
import "./App.css";
import Hello from "./Components/hello";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Form from "./Components/form";
import Edit from './Components/Edit';
import Create from './Components/Create';
import Show from './Components/Show';
import Home from './Components/home';


class App extends React.Component {
  render() {
    return (
      <div className="App">
         
        <Router>
        <Home />
          <Route component={Hello} path='/hello'></Route>
          <Route component={Form} path='/form'></Route>
          <Route path='/edit/:id' component={Edit}></Route>
          <Route path='/create' component={Create} ></Route>
          <Route path='/show/:id' component={Show} ></Route>
        </Router>
      </div>
    );
  }
}

export default App;
