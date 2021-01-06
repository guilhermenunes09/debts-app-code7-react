import React, { useEffect, useState, useRef, useContext } from 'react';
import { axiosGet } from '../components/fetchData.jsx';
import { idContext } from '../contexts/idContext.js';
import { API_RAILS } from '../apiAccess/config.js';
import './styles/debtsList.css';

function DebtsList (props) {

    let { value } = useContext(idContext);
    let [debtList, setDebtList] = useState();
    const debt = useRef(null);

    useEffect(()=> {
        axiosGet(API_RAILS).then(res => {
            setDebtList(res);
            console.log("DEBT LIST");
            console.log(res);
        });
    },[]);

    const handleClick = (e) => {
        e.preventDefault();
        value.updateId(1,e.currentTarget.id);
    }

    return(
 
        <div className="d-flex flex-column bd-highlight mb-3 text-center">
            ID: {value.id}
            { debtList && debtList.reverse().map((item,i) => {
                return (
                <div value={item._id.$oid} id={item._id.$oid} ref={debt} onClick={(e) => handleClick(e)} className="debt-single">
                    <div className="debt-item border border-info p-2 m-2 bd-highlight"><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>
                </div>
                )
            })}
        </div>
    );
}

export default DebtsList;