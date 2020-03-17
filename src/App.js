import React, { useEffect } from 'react';
import List from "./components/List";
import { getUsers } from "./store/actions/index";
import { connect } from "react-redux";
import './App.css';

const App = ({ getUsers }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Github users</h1>
      <List />
      <button onClick={getUsers}>See more users</button>
    </div>
  );
}
const mapStateToProps = state => ({
  loadingUsers: state.loadingUsers,
  errorMessage: state.errorMessage,
  users: state.users
});
const mapDispatchToProps = { getUsers }

export default connect(mapStateToProps, mapDispatchToProps)(App);
