import React, { useState, useEffect } from 'react'
import './App.css';

import { axiosGet } from './components/fetchData.jsx';

/* Pages with Components */
import ClientsIndex from './pages/clients/index';
import DebtsNew from './pages/debts/new';

function App() {

  const [clientsTable, setClientsTable] = useState([]);

  useEffect(
   () => {
     axiosGet.then((data) => {
      setClientsTable(data);
     });
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
