import React from 'react';
import ClientCard from '../../components/clientCard.jsx';

function ClientsIndex (props) {

  return (
    <div className="ClientsList">
        {props.clientsProp.map(function (item, i) {
            return <ClientCard key={new Date().getTime() + i} clientCard={item} />
          })}
    </div>
  );
}
  
export default ClientsIndex;
  