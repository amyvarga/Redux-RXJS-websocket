import React from "react";
import { connect } from "react-redux";
import UL from "./styles/busList";

const ListItem = ({
  id, 
  stationName, 
  vehicleId, 
  timeToStation, 
  towards, 
  expectedArrival
}) => {
  return (
    <li key={id}>
    <strong>{stationName}</strong><br />
    <p>The bus with licence plate <em>{vehicleId}</em> is expected to arrive at <em>{stationName}</em> in <em>{timeToStation}</em> minutes.  It is currently heading towards <em>{towards}</em> and will arrive at <em>{expectedArrival}</em></p>
  </li>
  )
};

const List = ({vehicleId, buses}) => (
  <div className="list">
    <h4>{vehicleId}</h4>
    <UL>{buses.map(ListItem)}</UL>
  </div>
);

const ConnectedList = ({ buses, loadingBuses, errorMessage}) => {
  const {inbound, outbound} = buses;
  return (
    <div>
     {buses && inbound && <h3>Towards Labroke Grove</h3>}
     {buses && Object.keys(inbound).map(vehicleId => 
      <List key={vehicleId} vehicleId={vehicleId} buses={inbound[vehicleId]} />
     )}
    </div>
  )
};

const mapStateToProps = state => ({
  loadingBuses: state.loadingBuses,
  errorMessage: state.errorMessage,
  buses: state.buses
});

const BusList = connect(mapStateToProps)(ConnectedList);
export default BusList;