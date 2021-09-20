import React, { Component } from "react";
import "./App.css";
import SideBar from "./SideBar";

class App extends Component {
  render() {
    return (
      <>
        <div className="wrapper">
          <SideBar />
        </div>
      </>
    );
  }
}

export default withRouter(App);
