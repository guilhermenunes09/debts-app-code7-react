
import React, { useState, useEffect, createContext, useContext } from 'react'
import { DebtsContext } from './contexts/currentClient.js';
import './App.css';

import { API_JSON, API_RAILS } from './apiAccess/config.js';
import { axiosGet } from './components/fetchData.jsx';

/* Pages with Components */
import ClientsIndex from './pages/clients/index';
import DebtsNew from './pages/debts/new';
import Nav from './pages/navigation/nav.jsx';



function App() {

  const [clients, setClients] = useState([]);
  const [debts, setDebts] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedIdArray, setSelectedIdArray] = useState();
  

  const getDebts = () => {
    axiosGet(API_RAILS).then(response => {
      setDebts(response);
  });
  }

  const getClients = () => {
    axiosGet(API_JSON).then(res => {
      setClients(res);
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

  const updateSelectedClient = (client) => {
    setSelectedClient(client);
    console.log("CHECKCLIENT");
    console.log(client);
  }

  const updateDebts = (debt) => {
    setDebts(debts => [...debts, debt]);
  }

  const updateSelectedIdArray = (idArray) => {
    setSelectedIdArray(idArray)
  }

  const value = {
    id: 4,
    clients: clients,
    debts: debts,
    selectedClient: selectedClient,
    selectedIdArray: selectedIdArray,
    updateSelectedClient: updateSelectedClient,
    updateSelectedIdArray: updateSelectedIdArray,
    updateDebts: updateDebts
  }
  

  return (
    <DebtsContext.Provider value={value}>
        <div className="App">
          <nav class="navbar navbar-dark bg-dark mb-4">
            <a class="navbar-brand" href="#">Debts App</a>
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
          
          <DebtsNew />
          
          {/* <ClientsIndex clientsProp={clientsTable}/> */}
        </div>
      </DebtsContext.Provider>
  );
}

export default App;
