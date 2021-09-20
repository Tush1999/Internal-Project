import React, { Component } from "react";
import Airtable from "airtable";
import { NavLink } from "react-router-dom";
import "./style.css";

const base = new Airtable({ apiKey: "keyHHrGcNLiewGh05" }).base(
  "appnnQqeeXZmvVJvB"
);

export default class MeetingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { employee: [] };
  }
  componentDidMount() {
    let name = this.props.name.match.params.name;
    let pIdentifier= `'${name}'`;
    base("Imported table")
      .select({
        view: "Grid view",
        filterByFormula: "SEARCH(" + pIdentifier + ",{Participant Identifier})",
      })
      .eachPage((records, fetchNextPage) => {
        this.setState({ employee: records });
        fetchNextPage();
      });
  }
  render() {
    var pName = "";
    if (this.state.employee.length !== 0) {
      pName = this.state.employee[0].fields["Participant Name"];
    }
    return (
      <div className="rightbar">
        <h1>{pName}</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="row">Meeting Code</th>
              <th>Conference ID</th>
              <th scope="row">Event Name</th>
              <th scope="row">Organizer Email</th>
              <th>Meeting Details</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employee.map((value,index) => (
              <tr key={index}>
                <td>
                    {value.fields["Meeting Code"]}
                </td>
                <td>
                  <NavLink
                    className="link-conference"
                    to={`/conference/${value.fields["Conference ID"]}`}
                  >
                    {value.fields["Conference ID"]}
                  </NavLink>
                </td>
                <td>{value.fields["Event Name"]}</td>
                <td>{value.fields["Organizer Email"]}</td>
                <td>
                  <NavLink
                    to={`/employee/${this.name}/details/${value.fields["Conference ID"]}`}
                    className="link"
                  >
                    View Details
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
