import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter, Link } from "react-router-dom";
import Employees from "./Components/Employees/Employees";
import Conferences from "./Components/Conference/Conferences";
import ConferenceData from "./Components/Conference/ConferenceData";
import MeetingDetail from "./Components/Employees/MeetingDetail";
import Details from "./Components/Employees/Details";
import SideBar from "./SideBar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { goals: [] };
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-dark">
          <Link className="home-link" to="/">
            Home
          </Link>
        </nav>
        <div className="wrapper">
          <SideBar />
          <Switch>
            <Route exact path="/employees" render={() => <Employees />} />
            <Route exact path="/conferences" render={() => <Conferences />} />
            <Route
              exact
              path="/employee/:name"
              render={(props) => <MeetingDetail name={props} />}
            />
            <Route
              exact
              path="/employee/:name/details/:meeting"
              render={(props) => <Details name={props} />}
            />
            <Route
              exact
              path="/conference/:id"
              render={(props) => <ConferenceData name={props} />}
            />
          </Switch>
        </div>
      </>
    );
  }
}

export default withRouter(App);
