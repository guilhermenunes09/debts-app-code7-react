
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
import ClientsIndex from './pages/clients/index';
import DebtsNew from './pages/debts/new';
import Nav from './pages/navigation/nav.jsx';
import SessionsNew from './pages/sessions/new.jsx';
import RegistrationsNew from './pages/registrations/new.jsx';



function App() {

  const [clients, setClients] = useState(null);
  const [debts, setDebts] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedIdArray, setSelectedIdArray] = useState();
  const [editMode, setEditMode] = useState();
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const getDebts = () => {
    axiosGet(API_RAILS).then(response => {
      console.log("Check Debts Response");
      console.log(response);
      if(response.status === 200) {
        setDebts(response.data);
      }
      if(response.status === 401) {
        console.log("REDIRECT");
        setRedirect(true);
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

  useEffect(()=>{
    console.log("Clients");
    console.log(clients);
    console.log("Debts");
    console.log(debts);
  },[debts])

  useEffect(()=> {
    if (selectedClient) {
      updateEditMode(false)
    } else {
      updateEditMode(true)
    }
    
  },[selectedClient])

  const updateSelectedClient = (client) => {
    setSelectedClient(client);
    console.log("CHECKCLIENT");
    console.log(client);
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

  const value = {
    id: 4,
    clients: clients,
    debts: debts,
    selectedClient: selectedClient,
    selectedIdArray: selectedIdArray,
    editMode: editMode,
    updateSelectedClient: updateSelectedClient,
    updateSelectedIdArray: updateSelectedIdArray,
    updateDebts: updateDebts,
    updateEditMode: updateEditMode
  }
  
  const handleClickNew = () => {
    updateSelectedClient(null);
  }

  return (
    <DebtsContext.Provider value={value}>
        <Router history={history}>
          { redirect && ( <Redirect to='/login' /> )}
          
          
          <div className="App">
          <button onClick={handleClickNew} class="button button-new"></button>
            <nav class="navbar navbar-dark bg-dark mb-4">
              <Link className="navbar-brand" to='/'>Debts App</Link>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="#">Início<span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Registrar</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Login</a>
                  </li>
                </ul>
                <span class="navbar-text">
                  
                </span>
              </div>
            </nav>
            <h1>Adicionar Dívida</h1>

            <Switch>
              <Route path="/novo">
                <RegistrationsNew />
              </Route>
              <Route exact path="/login">
                <SessionsNew />
              </Route>
              <Route exact path="/">
                <DebtsNew />
              </Route>
            </Switch>
            
            {/* <ClientsIndex clientsProp={clientsTable}/> */}
          </div>
        </Router>
      </DebtsContext.Provider>
  );
}

export default App;
