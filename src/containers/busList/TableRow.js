import React from "react";
import {TR} from "../styles/busList";

const TableRow = ({
  id, 
  stationName, 
  timeToStation, 
  expectedArrival
}) => {
  return (
    <TR key={id}>
      <td className="dt">{stationName}:</td>
      <td className="dd">{timeToStation === 0 ?  
        <>Due</> :
        <>{timeToStation} {timeToStation === 1 ? <>minute</> : <>minutes</>} at {expectedArrival}</>
      }</td>
    </TR>
  )
};

export default TableRow;