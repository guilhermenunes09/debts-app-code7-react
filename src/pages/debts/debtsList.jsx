import React, { useEffect, useState, useRef, useContext } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import './debtsList.css';

function DebtsList () {

    const value = useContext(DebtsContext);

    /* Declaring Component States */
    let [id, setId] = useState(0);
    let [idArray, setIdArray] = useState(0);
    let [debtList, setDebtList] = useState();


    let [clientData, setClientData] = useState({
        reason: " ",
        amount: 0.00,
        when: "00-00-0000",
    });

    useEffect(()=> {
        if(value.debts && typeof value.debts[idArray] !== "undefined") {
            const dl = value.debts[idArray];
            const clientData = {
                reason: dl.reason,
                amount: dl.amount,
                when: dl.when,
            }
            setClientData(clientData);
        }
    },[idArray]);
    
    /* Local States */
    const debt = useRef(null);

    const [activeIndex, setActiveIndex] = useState();

    /* When Item selected, update Context Provider */
    const handleClick = (e) => {
        e.preventDefault();
        console.log("Debt");
        console.log(e);
        //e.currentTarget.className = "debt-item-selected"
        /* ID MongoDb */
        setId(e.currentTarget.getAttribute("value"));
        /* ID Local Array */
        setIdArray(e.currentTarget.id);
    }

    let StyleClass = {
        selected: "debt-item-selected p-2 m-2 bd-highlight",
        notSelected: "debt-item border border-info p-2 m-2 bd-highlight",
    }
 
    return(
        <>
            <button class="button button-new"></button>
            <div className="d-flex flex-column bd-highlight mb-3 text-center">
                ID: {id}
                { value.debts && value.debts.reverse().map((item,i) => {

                    return <div className={id === item._id.$oid ? StyleClass.selected : StyleClass.notSelected} key={i} ref={debt} value={item._id.$oid} id={i}  onClick={(e) => handleClick(e)}><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>                        
     
                })}
            </div>
        </>
    );
}

export default DebtsList;