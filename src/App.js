
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




const defaultClient = { 
  id: null,
  name: null,
  username: null,
  email: null,
  address: {
      street: null,
      suite: null,
      city: null,
      zipcode: null,
      geo: {
          lat: null,
          lng: null
      }
  },
  phone: null,
  website: null,
  company: {
      name: null,
      catchPhrase: null,
      bs: null
  },
}

const initialDebt = {
  _id: {
      $oid: null
  },
  amount: null,
  client: defaultClient,
  reason: null,
  when: null
};



function App() {

  const [clients, setClients] = useState([defaultClient]);
  const [debts, setDebts] = useState([initialDebt]);
  const [selectedClient, setSelectedClient] = useState(initialDebt);
  const [selectedIdArray, setSelectedIdArray] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [authorized, setAuthorized] = useState();
  let history = useHistory();

  const getDebts = () => {
    axiosGet(API_RAILS).then(response => {
      if(response && response.status === 200) {
        setAuthorized(true);
        setDebts(response.data);
      }
      if(response && response.status === 401) {
        setAuthorized(false);
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
    if (selectedClient._id.$oid) {
      updateEditMode(false)
    } else {
      updateEditMode(true)
    }
  },[selectedClient])

  const updateSelectedClient = (client) => {
    setSelectedClient(client);
  }

  const updateSaveDebts = (debt) => {
    setDebts(debts => [debt, ...debts]);
  }

  const updateEditDebts = (debt, selectedIdArray) => {
    const newDebts = debts;
    newDebts[selectedIdArray] = debt;
    setDebts(newDebts);
  }

  const updateExcludeDebts = (selectedIdArray) => {
    const newDebts = debts;
    newDebts.splice(selectedIdArray, 1);
    setDebts(newDebts);
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
    updateSaveDebts: updateSaveDebts,
    updateEditMode: updateEditMode,
    updateExcludeDebts: updateExcludeDebts,
    updateAuthorized: updateAuthorized,
    updateEditDebts: updateEditDebts,
    initialDebt: initialDebt
  }
  
  const handleClickNew = () => {
    updateSelectedClient(initialDebt);
    updateSelectedIdArray(null);
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
