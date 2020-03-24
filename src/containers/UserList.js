import React from "react";
import { connect } from "react-redux";
import UL from "./styles/userList";

const ConnectedList = ({ users, loadingUsers, errorMessage }) => {
  return (
    <UL>
      {users && users.map(el => (
        <li key={el.id}>
          <a href={el.html_url} target="_blank" rel="noopener noreferrer">
            <img alt={el.login} src={el.avatar_url} />
            <span>{el.login}</span>
          </a>
        </li>
      ))}
      {errorMessage &&
        <p>Network error</p>
      }
      {loadingUsers &&
        <React.Fragment>
          {Array.from({ length: 30 }).map((_, i, arr) => <li key={i}></li>)}
        </React.Fragment>
      }
    </UL>
  )
};

const mapStateToProps = state => ({
  loadingUsers: state.loadingUsers,
  errorMessage: state.errorMessage,
  users: state.users
});

const List = connect(mapStateToProps)(ConnectedList);
export default List;