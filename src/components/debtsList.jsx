import React, { useEffect, useState } from 'react';
import { axiosGet } from '../components/fetchData.jsx';
import { API_RAILS } from '../apiAccess/config.js';

function DebtsList (props) {

    let [debtList, setDebtList] = useState();

    useEffect(()=> {
        axiosGet(API_RAILS).then(res => {
            setDebtList(res);
            console.log("DEBT LIST");
            console.log(res);
        });
    },[]);

    return(
        <>
            <div className="d-flex flex-column bd-highlight mb-3 text-center">
                { debtList && debtList.map((item,i) => {

                    return (
                    <>
                        <div className="border border-primary p-2 m-2 bd-highlight"><p>{ item.name }</p> <p>{ item.amount }</p></div>
                    </>
                    )
                })}

            </div>
        </>
    );
}

export default DebtsList;