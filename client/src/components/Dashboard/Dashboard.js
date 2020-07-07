import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SideBar } from '../';

import TempLogin from './TempLogin';
import { Button } from "@material-ui/core";

const Dashboard = () => {
  const session = useSelector(state => state.session);
  const [isSigningUp, setIsSigningUp] = useState(false);

  if (session) return <SideBar />;

  return isSigningUp ? (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', height: '100%', paddingTop: '30vh'}}>
      <div><h1>Sign Up</h1></div>
      <div style={{marginBottom: '30px'}}><h3>This page is under construction.</h3></div>
      <div><Button variant='contained' onClick={() => setIsSigningUp(false)}>Back to Login</Button></div>
    </div>
  ) : (
    <TempLogin onChangeToSignUp={() => setIsSigningUp(true)} />
  );
};

export default Dashboard;