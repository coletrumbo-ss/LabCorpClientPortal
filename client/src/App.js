import React from 'react';
import { connect } from 'react-redux';
import { SideBar } from './components'
import { LogIn } from './pages';

// NOTE: Change "undefined" below to "true" to 
// re-enable the login page 

const App = (props) => 
  <div>{props.loggedIn === undefined 
    ? <SideBar /> 
    : <LogIn />
  }</div>

const mapStateToProps = (state) => {
  return {loggedIn: state.loginReducer.loggedIn};
}

export default connect(mapStateToProps, {})(App);
