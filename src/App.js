import React, { useState, useEffect, createContext } from 'react'
import './App.css';

import { API_JSON } from './apiAccess/config.js';
import { axiosGet } from './components/fetchData.jsx';

/* Pages with Components */
import ClientsIndex from './pages/clients/index';
import DebtsNew from './pages/debts/new';

import Nav from './pages/navigation/nav.jsx';


const selectedIdContext = createContext();
export const selectedIdConsumer = selectedIdContext.Consumer;

function App() {

  const [clientsTable, setClientsTable] = useState([]);
  const [selectedId, setSelectedId] = useState([]);

  const getData = () => {
    axiosGet(API_JSON).then(res => {
      setClientsTable(res);
    });
  }

  useEffect( 
    () => {
      getData();
    
    },[]
  );

  useEffect(()=>{
    console.log("Clients");
    console.log(clientsTable);
  },[clientsTable])

  return (
      <div className="App">

        <button class="button button-new"></button>

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
        <DebtsNew clientsProp={clientsTable} />
        
        {/* <ClientsIndex clientsProp={clientsTable}/> */}
      </div>
  );
}

export default App;
