import React, { useContext, useEffect } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import DebtsList from './debtsList.jsx';
import NewForm from './newForm.jsx';
import '../../components/styles/debtsNew.css';


// This Component contains 2 other components
// One is the list of Debts, the other is the form

function DebtsNew (props) {

    const value = useContext(DebtsContext);

    useEffect(() => {
        if(value.authorized === false) {
            props.history.push('/login');
        }
    },[]);

    let title = "   ";
    if (value.editMode && value.selectedClient._id.$oid === null) {
        title = "Nova Dívida";
    } else {
        title = value.selectedClient._id.$oid ? value.selectedClient.client.name : "   ";
    }

    return(
        <div className="container text-left">
            <div className="row">
                <div className="col-3">
                    <DebtsList />
                </div>
                <div className="col-9">
                    <div className="debt-new p-3 m-2 bd-highlight">
                        <h1>{ title } </h1>
                        <NewForm />
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default DebtsNew;