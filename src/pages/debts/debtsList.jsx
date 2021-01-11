import React, { useRef, useContext } from 'react';
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
        selected: "debt-item-selected p-2 m-2 bd-highlight",
        notSelected: "debt-item border border-info p-2 m-2 bd-highlight",
    }

    const oid = value.selectedClient ? value.selectedClient._id.$oid : 0;

    return(
        <div className="d-flex flex-column bd-highlight mb-3 text-center">
            {value.debts.map((item,i) => {
                return <div key={new Date().getTime() + i } className={oid === item._id.$oid ? StyleClass.selected : StyleClass.notSelected} ref={debt} value={item} id={i}  onClick={() => handleClick(item, i)}><p>{ item.client.name }</p> <p>R${ item.amount }</p></div>                        
    
            })}
        </div>
    );
}

export default DebtsList;