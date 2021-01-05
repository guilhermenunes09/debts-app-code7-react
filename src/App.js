import React, { useState, useEffect } from 'react'
import './App.css';

import { API_RAILS, API_JSON } from './apiAccess/config.js';
import { axiosGet } from './components/fetchData.jsx';

/* Pages with Components */
import ClientsIndex from './pages/clients/index';
import DebtsNew from './pages/debts/new';

function App() {

  const [clientsTable, setClientsTable] = useState([]);

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
      <DebtsNew clientsProp={clientsTable} />
      {/* <ClientsIndex clientsProp={clientsTable}/> */}
    </div>
  );
}

export default App;
