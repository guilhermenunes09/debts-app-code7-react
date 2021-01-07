import React, { useEffect, useState, useRef, useContext } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import './debtsList.css';

function DebtsList () {

    const value = useContext(DebtsContext);

    /* Declaring Component States */
    let [selectedIdArray, setSelectedIdArray] = useState(0);

    useEffect(()=> {
        if(value.debts && typeof value.debts[selectedIdArray] !== "undefined") {
            const dl = value.debts[selectedIdArray];
            const clientData = {
                oid: value.selectedOid,
                reason: dl.reason,
                amount: dl.amount,
                when: dl.when,
            }
            value.updateSelectedClient(clientData);
        }
    },[selectedIdArray]);
    
    /* Local States */
    const debt = useRef(null);

    /* When Item selected, update Context Provider */
    const handleClick = (e) => {
        e.preventDefault();
        console.log("Debt");
        console.log(e);
        //e.currentTarget.className = "debt-item-selected"
        /* ID MongoDb */
        value.updateSelectedOid(e.currentTarget.getAttribute("value"));
        /* ID Local Array */
        setSelectedIdArray(e.currentTarget.id);
        value.updateSelectedIdArray(e.currentTarget.id);
    }

    let StyleClass = {
        selected: "debt-item-selected p-2 m-2 bd-highlight",
        notSelected: "debt-item border border-info p-2 m-2 bd-highlight",
    }
 
    return(
        <>
            <button class="button button-new"></button>
            <div className="d-flex flex-column bd-highlight mb-3 text-center">
                ID: {value.selectedOid}
                { value.debts && value.debts.reverse().map((item,i) => {

                    return <div className={value.selectedOid === item._id.$oid ? StyleClass.selected : StyleClass.notSelected} key={i} ref={debt} value={item._id.$oid} id={i}  onClick={(e) => handleClick(e)}><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>                        
     
                })}
            </div>
        </>
    );
}

export default DebtsList;