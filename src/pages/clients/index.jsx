import React from 'react';
import ClientCard from '../../components/clientCard.jsx';

function ClientsIndex (props) {


  return (
    <div className="App">
      <div className="text-danger">
    
        {props.clientsProp && props.clientsProp.map(function (item, i) {
            return <ClientCard clientCard={item} />
          })}
        
      </div>
    </div>
  );
}
  
  export default ClientsIndex;
  