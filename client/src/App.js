import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createStore } from 'redux';

// import reducers from './reducers';

// const store = createStore(reducers);

// import './App.scss';

import Nav from './components/nav/Nav';
import HomePage from './components/Homepage/HomePage';
import Admin from './components/Admin';
import CandidatePage from './components/Candidate/Candidate';
import EmployerPage from './components/Employer/Employer';
import JobItem from './components/Homepage/JobItem/JobItem';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact={true} component={HomePage} />
          <Route path="/admin" exact={true} component={Admin} />
          <Route path="/candidates" component={CandidatePage} />
          <Route path="/employers" component={EmployerPage} />
          <Route path="/jobs" component={JobItem} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
