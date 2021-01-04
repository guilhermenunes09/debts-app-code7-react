import React, { useEffect } from 'react';

function ClientCard (props) {

    useEffect(()=> {
        console.log("testing");
        console.log(props.clientCard);
        console.log(props);
    });
  

  return (
    <>
        ID: {props.clientCard.id}
        Nome: {props.clientCard.name}

        Username: {props.clientCard.username}

    </>
  );
}
  
export default ClientCard;
  