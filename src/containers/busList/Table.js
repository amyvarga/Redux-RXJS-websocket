import React from "react";
import {TABLE} from "../styles/busList";
import TableRow from "./TableRow";

const Table = ({vehicleId, buses}) => (
  <div key={vehicleId} className="tableContainer">
    <TABLE>
      <thead>
        <tr key={vehicleId}>
            <th>
            <h4>Bus licence number <span>{vehicleId}</span></h4>
            </th>
            <th>
            <h4>Arriving in:</h4>
            </th>
        </tr>
      </thead>
      <tbody>
        {buses.map(TableRow)}
      </tbody>
    </TABLE>
  </div>
);

export default Table;