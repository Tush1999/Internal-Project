import React, { Component } from "react";
import ShowData from "./ShowData";
import Airtable from "airtable";
import "./style.css";

const base = new Airtable({ apiKey: "keyHHrGcNLiewGh05" }).base(
  "appnnQqeeXZmvVJvB"
);

export default class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = { searchField: "", employees: [] };
  }
  componentDidMount() {
    base("Imported table")
      .select({
        view: "Grid view",
        fields: ["Date", "Participant Name", "Participant Identifier"],
      })
      .eachPage((records, fetchNextPage) => {
        let array = records.map((record) => ({
          pName: record.fields["Participant Name"],
          pId: record.fields["Participant Identifier"],
        }));
        const result = [];
        const map = new Map();
        for (const item of array) {
          if (!map.has(item.pName)) {
            map.set(item.pName, true);
            result.push({
              pName: item.pName,
              pId: item.pId,
            });
          }
        }
        this.setState({ employees: result });
        fetchNextPage();
      });
  }
  handleSearch = (e) => {
    this.setState({ searchField: e.target.value });
  };
  render() {
    var filteredData = this.state.employees
      .filter((val) =>
        val.pName.toLowerCase().includes(this.state.searchField.toLowerCase())
      )
      .sort((a, b) => a.pName.localeCompare(b.pName));
    return (
      <div className="rightbar">
        <div>
          <input
            style={{ width: "30%" }}
            className="form-control"
            type="search"
            value={this.state.searchField}
            onChange={this.handleSearch}
            placeholder="search here"
          />
          <div>
            <ShowData data={filteredData} />
          </div>
        </div>
      </div>
    );
  }
}
