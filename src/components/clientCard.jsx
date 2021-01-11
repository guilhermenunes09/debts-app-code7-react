import React from 'react';
import "./styles/clientCard.css"

// To be in the Debts Index
// Not being used
function ClientCard (props) {

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.clientCard.name}</h5>
          <p className="card-text">{props.clientCard.username}</p>
          <p className="card-text">{props.clientCard.website}</p>
        </div>
      </div>
    </>
  );
}
  
export default ClientCard;
  