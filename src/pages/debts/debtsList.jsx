import React, { useEffect, useState, useRef, useContext } from 'react';
import { API_RAILS } from '../../apiAccess/config.js';
import { currentClient } from '../../contexts/currentClient.js';
import './debtsList.css';

function DebtsList (props) {

    /* Global States */
    let { value } = useContext(currentClient);
    
    /* Local States */
    
    const debt = useRef(null);

   

    /* When Item selected, update Context Provider */
    const handleClick = (e) => {
        e.preventDefault();
        /* ID MongoDb */
        value.updateClientId(1,e.currentTarget.getAttribute("value"));
        /* ID Local Array */
        value.updateArrayId(2, e.currentTarget.id);
    }

    return(
        <div className="d-flex flex-column bd-highlight mb-3 text-center">
            ID: {value.id}
            { value.debtList && value.debtList.reverse().map((item,i) => {
                return (
                <div key={i} value={item._id.$oid} id={i} ref={debt} onClick={(e) => handleClick(e)} className="debt-single">
                    <div className="debt-item border border-info p-2 m-2 bd-highlight"><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>
                </div>
                )
            })}
        </div>
    );
}

export default DebtsList;