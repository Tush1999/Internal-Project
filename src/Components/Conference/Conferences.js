import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Airtable from "airtable";
import "./style.css";

const base = new Airtable({ apiKey: "keyHHrGcNLiewGh05" }).base(
  "appnnQqeeXZmvVJvB"
);

class Conferences extends Component {
  constructor(props) {
    super(props);
    this.state = { conference: [] };
  }
  componentDidMount() {
    base("Imported table")
      .select({
        view: "Grid view",
        fields: ["Conference ID", "Date"],
      })
      .eachPage((records, fetchNextPage) => {
        let arr1 = records.map((record) => ({
          id: record.fields["Conference ID"],
          date: record.fields["Date"],
        }));
        const result = [];
        const map = new Map();
        for (const item of arr1) {
          if (!map.has(item.id)) {
            map.set(item.id, true); 
            result.push({
              id: item.id,
              date: item.date,
            });
          }
        }
        this.setState({ conference: result });
        fetchNextPage();
      });
  }

  render() {
    return (
      <div className="conference-div">
        {this.state.conference.map((value,index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <NavLink to={`/conference/${value.id}`}>
                Conference ID- {value.id} <b>{value.date}</b>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default withRouter(Conferences);
