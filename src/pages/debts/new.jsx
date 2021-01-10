import React, { useState, useEffect, useRef, useContext, useCallback, useHistory } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import DebtsList from './debtsList.jsx';
import NewForm from './newForm.jsx';
import '../../components/styles/debtsNew.css';


// This Component it's both visualization and editing, depending
// on whether the client ID is 0 or different than 0           
// if 0, the component 'thinks' that the user wants to create a new record  

function DebtsNew (props) {
    const value = useContext(DebtsContext);
    

    useEffect(()=> {
        
    },[]);
  
    return(
        <>
            <div className="container text-left">
                <div className="row">
                    <div className="col-sm-3">
                        <DebtsList />
                    </div>
                    <div className="col-sm-9">
                        <div className="debt-new d-flex p-4 m-2 bd-highlight">
                            <NewForm />
                        </div>
                    </div>    
                </div>
            </div>
        </>
    )
}

export default DebtsNew;