
import React, { useState, useEffect } from 'react'
import { DebtsContext } from './contexts/currentClient.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import './App.css';

import { API_JSON, API_RAILS } from './apiAccess/config.js';
import { axiosGet } from './components/fetchData.jsx';

/* Pages with Components */
import Navbar from './components/navbar.jsx';
import SessionsNew from './pages/sessions/new.jsx';
import DebtsNew from './pages/debts/new';
import RegistrationsNew from './pages/registrations/new.jsx';



/* Initial Data Structure */
// It avoids 'undefined' errors variables
// Changes in this structure might break the App completely
// Check API results from https://jsonplaceholder.typicode.com/users
// and Rails API http://localhost:3000/api/debts (requires authentication)
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

  /* Clients are the users from jsonplaceholder.typicode.com/users */
  const [clients, setClients] = useState([defaultClient]);
  /* Debts are the results from localhost:3000/api/debts */
  const [debts, setDebts] = useState([initialDebt]);
  /* SelectedClient is filled each time an item from Debtslist.jsx is cliked */
  const [selectedClient, setSelectedClient] = useState(initialDebt);
  /* Same as the above state, but only the ID of the array. */
  const [selectedIdArray, setSelectedIdArray] = useState(null);
  /* Makes all inputs to be enabled */
  const [editMode, setEditMode] = useState(true);
  /* Check if header authentication is set */
  const [authorized, setAuthorized] = useState();

  let history = useHistory();
  
  /* Fetch Data */
  // All Data requests are triggered only one time per HTTP request
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

  /* Users from Jsonplaceholder */
  const getClients = () => {
    axiosGet(API_JSON).then(res => {
      if(res && res.status === 200) {
        setClients(res.data);
      }
      
    });
  }

  /* Component Did Mount */
  useEffect(
    () => {
      getClients();
      getDebts();
    },[]
  );

  /* Client state watch */
  useEffect(()=> {
    if (selectedClient._id.$oid) {
      updateEditMode(false)
    } else {
      updateEditMode(true)
    }
  },[selectedClient])

  /* Functions directly related to the UseContext API */
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

  /* All Context Props and Functions */
  const value = {
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

  /* The App understands the user wants to create a new record when none of the clients is selected */
  const handleClickNew = () => {
    updateSelectedClient(initialDebt);
    updateSelectedIdArray(null);
  }

  return (
    <DebtsContext.Provider value={value}>
      <div className="App">
        <Router history={history}>
          <Navbar />
          <button onClick={handleClickNew} className="button button-new"></button>
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
