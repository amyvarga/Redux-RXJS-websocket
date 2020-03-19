import React, { useEffect } from 'react';
import UserList from "./components/UserList";
import BusList from "./components/BusList";
import { getUsers, getBuses } from "./store/actions/index";
import { connect } from "react-redux";
import './App.css';

const App = ({ getUsers, getBuses }) => {
  useEffect(() => {
    getUsers();
    getBuses();
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
