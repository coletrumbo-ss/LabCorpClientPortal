import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateInvoice, _updateInvoiceStarted } from '../../services/billing/actions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './Checkout.styles';

const Success = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [session, setSession] = useState({});
  const location = useLocation();
  const sessionId = location.search.replace('?session_id=', '');

  const updating = useSelector(state => state.invoiceReducer.updating)

  useEffect(() => {
    dispatch(_updateInvoiceStarted());

    async function fetchSession() {
      setSession(
        await fetch('/checkout-session?sessionId=' + sessionId).then((res) => {
          return res.json()
        }).then((res) => {
          dispatch(updateInvoice(res.metadata.invoiceid));
        })
      );
    }
    fetchSession();
  }, [sessionId]);

  return (
    <div>
      {updating ? 
        (<div className={classes.spinnerContainer}>
          <CircularProgress className={classes.progressSpinner} />
        </div>) :
        <div>
          <h1>Done</h1>
          <Link to='/billing'>Back to Billing</Link>
        </div>
      }
      
    </div>
  );
};

export default Success;