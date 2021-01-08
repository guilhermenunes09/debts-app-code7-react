import React, { useEffect, useState, useRef, useContext } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import './debtsList.css';

function DebtsList () {

    const value = useContext(DebtsContext);

    /* Local States */
    const debt = useRef(null);

    /* When Item selected, update Context Provider */
    const handleClick = (item) => {
        value.updateSelectedClient(item);
    }

    let StyleClass = {
        selected: "debt-item-selected p-2 m-2 bd-highlight",
        notSelected: "debt-item border border-info p-2 m-2 bd-highlight",
    }
    const oid = value.selectedClient ? value.selectedClient._id.$oid : 0;

    return(
        <>
            <div className="d-flex flex-column bd-highlight mb-3 text-center">
                ID: {value.selectedClient && value.selectedClient._id.$oid}
                { value.debts && value.debts.map((item,i) => {
                    console.log(item);
                    console.log("ITEM")
                    console.log("Client");
                    console.log(value.selectedClient);
                    if (value.selectedClient) {

                    }
                    return <div className={oid === item._id.$oid ? StyleClass.selected : StyleClass.notSelected} key={i} ref={debt} value={item} id={i}  onClick={() => handleClick(item)}><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>                        
     
                })}
            </div>
        </>
    );
}

export default DebtsList;