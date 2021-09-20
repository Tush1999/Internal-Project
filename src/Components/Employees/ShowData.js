import React from "react";
import { NavLink } from "react-router-dom";
function ShowData(props) {
  return (
    <>
      {props.data.map((value,index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <NavLink to={`/employee/${value.pId}`}>{value.pName}</NavLink>
          </div>
        </div>
      ))}
    </>
  );
}
export default ShowData;
