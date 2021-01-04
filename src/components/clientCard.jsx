import React, { useEffect } from 'react';
import "./styles/clientCard.css"

function ClientCard (props) {

    useEffect(()=> {
        console.log("testing");
        console.log(props.clientCard);
        console.log(props);
    });
  

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.clientCard.name}</h5>
          <p className="card-text">{props.clientCard.username}</p>
          <p className="card-text">{props.clientCard.website}</p>
          <a href="#" class="btn btn-primary">Visitar</a>
        </div>
      </div>
    </>
  );
}
  
export default ClientCard;
  