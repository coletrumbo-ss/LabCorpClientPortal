import React, { useState } from 'react';
import { useStyles } from './ProfileForm.styles';
import * as profileActions from '../../services/Profile/actions';
import {TextField, Button} from '@material-ui/core';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
    return {
      userInfo: state.loginReducer.userInfo,
    };
  }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(profileActions, dispatch),
  };
}

const ProfileForm = (props) => {
  const [profileInfo, setCurrentUserInfo] = useState({
    firstname: props.userInfo.firstName,
    address1_line1: props.userInfo.address,
    address1_city: props.userInfo.city,
    address1_stateorprovince: props.userInfo.state,
    address1_postalcode: props.userInfo.zipCode,
    mobilephone: props.userInfo.phone,
  });

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setCurrentUserInfo({ ...profileInfo, [name]: value });
    console.log(profileInfo)
  };

  const classes = useStyles(props);
  
  return (
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <h2> User Profile </h2>
          <h3> Edit General Information </h3>
          <TextField
              className={classes.fieldBox}
              id="contactFullName"
              label="Full Name"
              name="fullname"
              defaultValue= {props.userInfo.firstName + " " + props.userInfo.lastName}
              InputProps={{ readOnly: true, }}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactInsNum"
              label="Insurance Plan"
              defaultValue= {props.userInfo.insurancePlan}
              InputProps={{ readOnly: true, }}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactAddrStreet"
              name="address1_line1"
              label="Street Address"
              onChange={(e) => handleInfoChange(e)}
              defaultValue= {props.userInfo.address}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactAddrCity"
              name="address1_city"
              label="City"
              onChange={(e) => handleInfoChange(e)}
              defaultValue= {props.userInfo.city}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactAddrState"
              name="address1_stateorprovince"
              label="State"
              onChange={(e) => handleInfoChange(e)}
              defaultValue= {props.userInfo.state}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactAddrZip"
              name="address1_postalcode"
              label="ZIP Code"
              onChange={(e) => handleInfoChange(e)}
              defaultValue= {props.userInfo.zipCode}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactPhone"
              name="mobilephone"
              label="Phone Number"
              onChange={(e) => handleInfoChange(e)}
              defaultValue= {props.userInfo.phone}
              variant="filled"
          />
          <TextField
              className={classes.fieldBox}
              id="contactEmail"
              label="Email"
              defaultValue= {props.userInfo.email}
              InputProps={{ readOnly: true, }}
              variant="filled"
          />
          <Button
            className={classes.fieldBox}
            variant="contained"
            margineLeft="60%"
            onClick={(e) => {
              e.preventDefault()
              props.actions.updateProfile(profileInfo, props.userInfo.contactId)
            }}
          > Update Information
          </Button>

          <h3> Your Login Credentials </h3>
          <TextField
              className={classes.fieldBox}
              id="contactLoginUsername"
              label="Username"
              defaultValue={props.userInfo.firstName + "." + props.userInfo.lastName}
              InputProps={{ readOnly: true, }}
              variant="filled"
          />
          {/* <TextField
              className={classes.fieldBox}
              id="filled-password-input"
              name="password"
              label="Password"
              type="password"
              defaultValue= {props.userInfo.userPassword}
              //autoComplete="current-password"
              variant="filled"
          />
          <Button 
          className={classes.button}
          variant="filled"
          type="submit" 
          > Update Password
          </Button> */}
        </div>
      </form>
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
