
import React, { useState, useEffect, createContext, useContext } from 'react'
import { DebtsContext } from './contexts/currentClient.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";
import './App.css';

import { API_JSON, API_RAILS } from './apiAccess/config.js';
import { axiosGet } from './components/fetchData.jsx';

/* Pages with Components */
import Navbar from './components/navbar.jsx';
import SessionsNew from './pages/sessions/new.jsx';
import ClientsIndex from './pages/clients/index';
import Nav from './pages/navigation/nav.jsx';

import DebtsNew from './pages/debts/new';
import RegistrationsNew from './pages/registrations/new.jsx';




function App() {

  const [clients, setClients] = useState(null);
  const [debts, setDebts] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedIdArray, setSelectedIdArray] = useState();
  const [editMode, setEditMode] = useState();
  const [authorized, setAuthorized] = useState(false);
  let history = useHistory();

  const getDebts = () => {
    axiosGet(API_RAILS).then(response => {
      if(response.status === 200) {
        setAuthorized(true);
        setDebts(response.data);
      }
      if(response.status === 401) {
        //setAuthorized(false);
      }
  });
  }

  const getClients = () => {
    axiosGet(API_JSON).then(res => {
      if(res && res.status === 200) {
        setClients(res.data);
      }
      
    });
  }

  useEffect(
    () => {
      getClients();
      getDebts();
    },[]
  );

  useEffect(()=> {
    if (selectedClient) {
      updateEditMode(false)
    } else {
      updateEditMode(true)
    }
  },[selectedClient])

  const updateSelectedClient = (client) => {
    setSelectedClient(client);
  }

  const updateDebts = (debt) => {
    setDebts(debts => [debt, ...debts]);
  }

  const updateSelectedIdArray = (idArray) => {
    setSelectedIdArray(idArray)
  }

  const updateEditMode = (editMode) => {
    setEditMode(editMode);
  }

  const updateAuthorized = (authorized) => {
    setAuthorized(authorized);
  }

  const value = {
    id: 4,
    clients: clients,
    debts: debts,
    selectedClient: selectedClient,
    selectedIdArray: selectedIdArray,
    editMode: editMode,
    authorized: authorized,
    updateSelectedClient: updateSelectedClient,
    updateSelectedIdArray: updateSelectedIdArray,
    updateDebts: updateDebts,
    updateEditMode: updateEditMode,
    updateAuthorized: updateAuthorized
  }
  
  const handleClickNew = () => {
    updateSelectedClient(null);
  }

  return (
    <DebtsContext.Provider value={value}>
      <div className="App">
        <Router history={history}>
          <Navbar />
          <button onClick={handleClickNew} class="button button-new"></button>

          { authorized === false && ( <Redirect to='/login' />)}
              <Switch>
                <Route exact path="/novo" component={RegistrationsNew} />
                <Route exact path="/login" component={SessionsNew} />
                <Route exact path="/" component={DebtsNew} />  
              </Switch>
        </Router>
      </div>
    </DebtsContext.Provider>
  );
}

export default App;
