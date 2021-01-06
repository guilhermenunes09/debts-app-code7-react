import React from 'react';
import ClientCard from '../../components/clientCard.jsx';

function ClientsIndex (props) {

  return (
    <div className="ClientsList">
        {props.clientsProp && props.clientsProp.map(function (item, i) {
            return <ClientCard clientCard={item} />
          })}
    </div>
  );
}
  
export default ClientsIndex;
  