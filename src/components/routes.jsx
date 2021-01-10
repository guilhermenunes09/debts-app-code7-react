import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
  } from "react-router-dom";
import DebtsNew from '../pages/debts/new';
import SessionsNew from '../pages/sessions/new.jsx';
import RegistrationsNew from '../pages/registrations/new.jsx';
import { DebtsContext } from '../contexts/currentClient.js';

function Routes () {
    const value = useContext(DebtsContext);
    return(
        
    );
}

export default Routes;