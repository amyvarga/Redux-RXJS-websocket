import React, { useEffect } from 'react';
import UserList from "./containers/UserList";
import BusList from "./containers/BusList";
import { getUsers, getBuses } from "./store/actions/index";
import { connect } from "react-redux";
import './App.css';

const App = ({ getUsers, getBuses }) => {
  useEffect(() => {
    getUsers();
    getBuses(295);
    
  }, [getUsers, getBuses]);

  return (
    <div>
      <section>
        <h1>Github users</h1>
        <UserList />
        <button onClick={getUsers}>See more users</button>
      </section>
      <section>
        <h2>Tfl bus status (updates every 60 seconds)</h2>
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
