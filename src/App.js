import React, { useEffect } from 'react';
//import { w3cwebsocket as W3CWebSocket } from 'websocket';
import UserList from "./components/UserList";
import BusList from "./components/BusList";
import { getUsers, getBuses } from "./store/actions/index";
import { connect } from "react-redux";
import './App.css';

//const client = new W3CWebSocket("ws://127.0.0.1:8000");

const App = ({ getUsers, getBuses }) => {
  useEffect(() => {
    getUsers();
    getBuses();
   /*  client.onopen = () => { };
    client.onmessage = event => {
      console.log('event', event);
    }; */
  }, [getUsers, getBuses]);

  return (
    <div>
      <section>
        <h1>Github users</h1>
        <UserList />
        <button onClick={getUsers}>See more users</button>
      </section>
      <section>
        <h2>Tfl bus status - bus 295</h2>
        <BusList />
      </section>
    </div>
  );
}
const mapStateToProps = state => ({
  loadingUsers: state.loadingUsers,
  errorMessage: state.errorMessage,
  users: state.users,
  loadingBuses: state.loadingBuses,
  buses: state.buses
});
const mapDispatchToProps = { getUsers, getBuses }

export default connect(mapStateToProps, mapDispatchToProps)(App);
