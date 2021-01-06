import React, { useEffect, useState, useRef, useContext } from 'react';
import { API_RAILS } from '../../apiAccess/config.js';
import { currentClient } from '../../contexts/currentClient.js';
import { axiosGet } from '../../components/fetchData.jsx';
import './debtsList.css';

function DebtsList (props) {

    /* Global States */
    let { value } = useContext(currentClient);
    
    /* Local States */
    let [debtList, setDebtList] = useState();
    const debt = useRef(null);

    /* Request List from Local Server API */
    useEffect(()=> {
        axiosGet(API_RAILS).then(response => {
            setDebtList(response);
        });
    },[]);

    /* When Item selected, update Context Provider */
    const handleClick = (e) => {
        e.preventDefault();
        /* ID MongoDb */
        value.updateClientId(1,e.currentTarget.getAttribute("value"));
        /* ID Local Array */
        value.updateArrayId(2, e.currentTarget.id);

        value.updateDebtList(3, debtList);
    }

    return(
        <div className="d-flex flex-column bd-highlight mb-3 text-center">
            ID: {value.id}
            { debtList && debtList.reverse().map((item,i) => {
                return (
                <div value={item._id.$oid} id={i} ref={debt} onClick={(e) => handleClick(e)} className="debt-single">
                    <div className="debt-item border border-info p-2 m-2 bd-highlight"><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>
                </div>
                )
            })}
        </div>
    );
}

export default DebtsList;