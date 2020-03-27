import React from "react";
import { connect } from "react-redux";
import {SECTION} from "./styles/busList";
import Table from "./busList/Table";

const ConnectedList = ({buses, loadingBuses, errorMessage}) => {
  const {inbound, outbound} = buses;
  const inboundKeys = Object.keys(inbound);
  const outboundKeys = Object.keys(outbound);
  return (
    <>
      <SECTION>
        {loadingBuses && <h2>Loading...</h2>}
        {errorMessage && <h2>Unable to load</h2>}
        {!!inboundKeys && <h2>Bus 295</h2>}
        {!!inboundKeys.length && <h3>Towards Labroke Grove</h3>}
        {inboundKeys.map(vehicleId => 
          <Table key={vehicleId} vehicleId={vehicleId} buses={inbound[vehicleId]} />
        )}
        {!!outboundKeys.length && <h3>Towards Clapham Junction</h3>}
        {Object.keys(outbound).map(vehicleId => 
          <Table key={vehicleId} vehicleId={vehicleId} buses={outbound[vehicleId]} />
        )}
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