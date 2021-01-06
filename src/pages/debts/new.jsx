import React, { useState, useEffect, useRef, createContext } from 'react';
import DebtsList from './debtsList.jsx';
import { axiosPost } from '../../components/postData.jsx';
import { axiosGet } from '../../components/fetchData.jsx';
import { API_RAILS } from '../../apiAccess/config.js';
import '../../components/styles/debtsNew.css';
import { currentClient } from '../../contexts/currentClient.js';

// This Component it's both visualization and editing, depending
// on whether the client ID is 0 or different than 0           
// if 0, the component 'thinks' that the user wants to create a new record  

function DebtsNew (props) {

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
        if(debtList && typeof debtList[idArray] !== "undefined") {
            const dl = debtList[idArray];
            const clientData = {
                reason: dl.reason,
                amount: dl.amount,
                when: dl.when,
            }
            setClientData(clientData);
        }
    },[idArray]);

    /* Request List from Local Server API */
    useEffect(()=> {
        axiosGet(API_RAILS).then(response => {
            setDebtList(response);
        });
    },[]);

    /* Declaring Form references */
    const inputClient = useRef(null);  const inputReason = useRef(null);
    const inputAmount = useRef(null);   const inputWhen = useRef(null);

    /* Get Form Data and Send it to local API */
    const handleClick = () => {       
        const selected = inputClient.current.selectedIndex;
        const myClient = inputClient.current[selected].getAttribute("data-value");
        console.log("POST ID");
        console.log(id);
        const dataPost = {
            id: id,
            reason:inputReason.current.value,
            amount:inputAmount.current.value,
            when:inputWhen.current.value,
            client: myClient
        };
        axiosPost(dataPost, API_RAILS).then((response) => {
            if(response.status === 200) {
                console.log("Sucesos");
                console.log(response.data);
                //let newDebtList = debtList.unshift(response.data.debt)
                console.log("BEFORE");
                console.log(debtList);
                setDebtList(debtList => [...debtList, response.data.debt]);
                console.log("AFTER");
                //console.log(newDebtList);

                
                //setDebtList(newDebtList)
            } else {
                console.log("Falhou");
            }
        });
    }

    useEffect(() => {
        console.log("AFTER")
        console.log(debtList);
    },[debtList])

     

    /* Use Context Config */
    let value = {
        id: id,
        idArray: idArray,
        updateClientId: updateClientId,
        updateArrayId: updateArrayId,
        debtList: debtList,
    }

    function updateClientId (key=1, id) {
        setId(id);
     }
     function updateArrayId (key=32, idArray) {
         setIdArray(idArray);
     }

     function setIdToZero (key=39, id=0) {
         setId(id);
         setIdArray(id);
         setClientData({
            reason: " ",
            amount: 0.00,
            when: "00-00-0000",
         });
         
     }


    return(
        <currentClient.Provider value={{value}}>
            {id}
            <button onClick={setIdToZero} class="button button-new"></button>
            <div className="container text-left">
                <div className="row">
                    <div className="col-sm-3 border border-danger">
                        <DebtsList clientsProp={props.clientsProp} />
                    </div>
                    <div className="col-sm-9 border border-warning">
                        <div className="debt-new d-flex p-4 m-2 border border-info bd-highlight">
                            <form key={id}>
                                <select defaultValue={idArray || ''} ref={inputClient} className="form-control form-control-lg">
                                    <option disabled={true} value="">Escolha um cliente</option>
                                    {props.clientsProp && props.clientsProp.map(function (item, i) {
                                        return <option value={i} data-value={JSON.stringify(item)}>{item.name}</option>
                                    })}
                                </select>
                                <div className="form-group">
                                    <label for="formGroupExampleInput">Motivo</label>
                                    <input defaultValue={clientData.reason} ref={inputReason} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput" class="mr-sm-2">Valor</label>
                                    <div className="form-inline">
                                        <input defaultValue={clientData.amount}  ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="R$" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput" class="mr-sm-2">Data</label>
                                    <div className="form-inline">
                                        <input defaultValue={clientData.when}  ref={inputWhen} type="date" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
                                    </div>
                                </div>
                                <button type="button" class="btn btn-outline-secondary">Excluir</button>
                                <button onClick={handleClick} type="button" class="btn btn-outline-primary">Salvar</button>
                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </currentClient.Provider>
    )
}

export default DebtsNew;