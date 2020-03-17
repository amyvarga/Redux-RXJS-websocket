import React from "react";
import { connect } from "react-redux";
import UL from "./styles/busList";

const AnotherList = ({ buses, loadingBuses, errorMessage}) => {
  const {inbound, outbound} = buses;
  const listItem = ({
    id, 
    stationName, 
    vehicleId, 
    timeToStation, 
    currentLocation, 
    expectedArrival
  }) => {
    return (
      <li key={id}>
      <strong>{stationName}</strong><br />
      <p>The bus with licence plate <em>{vehicleId}</em> is expected to arrive at <em>{stationName}</em> in <em>{timeToStation}</em> minutes.  It is currently at <em>{currentLocation}</em> and will arrive at <em>{expectedArrival}</em></p>
    </li>
    )
  };
  return (
    <div>
     {buses && inbound && <h3>Inbound buses</h3>}
     <UL>{buses && inbound.map(bus => listItem(bus))}</UL>
     {buses && outbound && <h3>Outbound buses</h3>}
     <UL>{buses && outbound.map(bus => listItem(bus))}</UL>
    </div>
  )
};

const mapStateToProps = state => ({
  loadingBuses: state.loadingBuses,
  errorMessage: state.errorMessage,
  buses: state.buses
});

const BusList = connect(mapStateToProps)(AnotherList);
export default BusList;