import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import DebtsList from './debtsList.jsx';
import { axiosPost } from '../../components/postData.jsx';
import { axiosDelete } from '../../components/deleteData.jsx';
import { API_JSON, API_RAILS } from '../../apiAccess/config.js';
import '../../components/styles/debtsNew.css';

// This Component it's both visualization and editing, depending
// on whether the client ID is 0 or different than 0           
// if 0, the component 'thinks' that the user wants to create a new record  

function DebtsNew () {
    const value = useContext(DebtsContext);
    /* Declaring Form references */
    const inputClient = useRef(null);  const inputReason = useRef(null);
    const inputAmount = useRef(null);   const inputWhen = useRef(null);

    /* Get Form Data and Send it to local API */
    const handleClick = () => {       
        const selected = inputClient.current.selectedIndex;
        const myClient = inputClient.current[selected].getAttribute("data-value");
        /////////////////CHANGE HERE ID AS SOON AS POSSIBLE
        const dataPost = {
            id: 0,
            reason:inputReason.current.value,
            amount:inputAmount.current.value,
            when:inputWhen.current.value,
            client: myClient
        };
        axiosPost(dataPost, API_RAILS).then((response) => {
            if(response.status === 200) {
                //setDebtList(debtList => [...debtList, response.data.debt]);

            } else {
                console.log("Requisição ao servidor retornou uma falha.");
            }
        });
    }

    const handleClickExclude = () => {
        axiosDelete(API_RAILS, 0).then(response => {
            if(response.status == 200) {
                console.log("Sucesso!");
            } else {
                console.log("Falhou!");
            }
        });
    }

    useEffect(()=> {
        console.log(DebtsContext);
    })

    return(
        <>
            <div className="container text-left">
                <div className="row">
                    <div className="col-sm-3 border border-danger">
                        <DebtsList />
                    </div>
                    <div className="col-sm-9 border border-warning">
                        <div className="debt-new d-flex p-4 m-2 border border-info bd-highlight">
                            
                        </div>
                    </div>    
                </div>
            </div>
        </>
    )
}

export default DebtsNew;
/*
<form key={value.id}>
                                <select defaultValue={value.idArray || ''} disabled={  false }  ref={inputClient} className="form-control form-control-lg">
                                    <option disabled={true} value="">Escolha um cliente</option>
                                    {props.clientsProp && props.clientsProp.map(function (item, i) {
                                        return <option value={i} data-value={JSON.stringify(item)}>{item.name}</option>
                                    })}
                                </select>
                                <div className="form-group">
                                    <label for="formGroupExampleInput">Motivo</label>
                                    <input defaultValue={value.clientData.reason} ref={inputReason} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput" class="mr-sm-2">Valor</label>
                                    <div className="form-inline">
                                        <input defaultValue={value.clientData.amount}  ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="R$" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput" class="mr-sm-2">Data</label>
                                    <div className="form-inline">
                                        <input defaultValue={value.clientData.when}  ref={inputWhen} type="date" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
                                    </div>
                                </div>
                                <button onClick={handleClickExclude} type="button" class="btn btn-outline-secondary">Excluir</button>
                                <button onClick={handleClick} type="button" class="btn btn-outline-primary">Salvar</button>
                            </form>
                            */