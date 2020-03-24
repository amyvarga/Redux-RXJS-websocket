import React from "react";
import { connect } from "react-redux";
import {TR, TABLE, SECTION} from "./styles/busList";

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

const Table = ({vehicleId, buses}) => (
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
);

const ConnectedList = ({ buses, loadingBuses, errorMessage}) => {
  const {inbound, outbound} = buses;
  return (
    <>
    <SECTION>
     {buses && inbound && <h3>295 towards Labroke Grove</h3>}
     <div className="tableGroup">
      {buses && Object.keys(inbound).map(vehicleId => 
        <div key={vehicleId} className="tableContainer">
          <Table key={vehicleId} vehicleId={vehicleId} buses={inbound[vehicleId]} />
        </div>
      )}
     </div>
    </SECTION>
    <SECTION>
     {buses && outbound && <h3>Towards Clapham Junction</h3>}
      <div className="tableGroup">
      {buses && Object.keys(outbound).map(vehicleId => 
        <div key={vehicleId} className="tableContainer">
          <Table key={vehicleId} vehicleId={vehicleId} buses={outbound[vehicleId]} />
        </div>
      )}
     </div>
    </SECTION>
    </>
  )
};

const mapStateToProps = state => ({
  loadingBuses: state.loadingBuses,
  errorMessage: state.errorMessage,
  buses: state.buses
});

const BusList = connect(mapStateToProps)(ConnectedList);
export default BusList;