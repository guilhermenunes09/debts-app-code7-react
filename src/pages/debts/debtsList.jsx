import React, { useRef, useEffect, useContext } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import './debtsList.css';

function DebtsList () {

    const value = useContext(DebtsContext);

    /* Local States */
    const debt = useRef(null);

    /* When Item selected, update Context Provider */
    const handleClick = (item, selectedIdArray) => {
        value.updateSelectedClient(item);
        value.updateSelectedIdArray(selectedIdArray);
    }
    /* UI shows which item is selected on the list */
    let StyleClass = {
        selected: "client-item debt-item-selected m-2 bd-highlight",
        notSelected: "client-item debt-item border border-info m-2 bd-highlight",
    }

    const oid = value.selectedClient ? value.selectedClient._id.$oid : 0;

    return(
        <div className="client-item d-flex flex-column bd-highlight mb-3 text-center">
            {value.debts.map((item,i) => {
                return <div key={new Date().getTime() + i } className={oid === item._id.$oid ? StyleClass.selected : StyleClass.notSelected} ref={debt} value={item} id={i}  onClick={() => handleClick(item, i)}><p className="d-none d-md-block">{ item.client.name }</p> <p className="d-none d-md-block">R${ item.amount }</p><p className="d-block d-sm-none pt-3">{item.client.name ? item.client.name.charAt(0) : ''}</p></div>                        
    
            })}
        </div>
    );
}

export default DebtsList;