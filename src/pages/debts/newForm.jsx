import React, { useRef, useContext, useState, useEffect } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import { axiosPost } from '../../components/postData.jsx';
import { axiosDelete } from '../../components/deleteData.jsx';
import { API_JSON, API_RAILS } from '../../apiAccess/config.js';

function NewForm () {
    const value = useContext(DebtsContext);

    /* Declaring Form references */
    const inputClient = useRef(null);  const inputReason = useRef(null);
    const inputAmount = useRef(null);   const inputWhen = useRef(null);
    

    /* Get Form Data and Send it to local API */
    const handleClickSave = () => {       
        const selected = inputClient.current.selectedIndex;
        const myClient = inputClient.current[selected].getAttribute("data-value");
        /////////////////CHANGE HERE ID AS SOON AS POSSIBLE
        const oid = value.selectedClient ? value.selectedClient._id.$oid : 0;
        const dataPost = {
            id: oid,
            reason:inputReason.current.value,
            amount:inputAmount.current.value,
            when:inputWhen.current.value,
            client: myClient
        };
        axiosPost(dataPost, API_RAILS).then((response) => {
            if(response.status === 200) {
                console.log("CHECK RESPONSE");
                console.log(response.data);
                value.updateDebts(response.data.debt);

            } else {
                console.log("Requisição ao servidor retornou uma falha.");
            }
        });
    }

    const handleClickExclude = () => {
        axiosDelete(API_RAILS, 0).then(response => {
            if(response.status == 200) {
                console.log("Sucesso!");
                console.log(response);
            } else {
                console.log("Falhou!");
            }
        });
    }

    const handleClickEdit = () => {
        value.updateEditMode(true);
        console.log("VALUE");
        console.log(value);
    }
    const selectDefaultValue = value.selectedClient ? value.selectedClient.client.id : ""
    return(
        <>
            <form key={new Date().getTime()}>
                <select disabled={value.editMode ? false : true} defaultValue={selectDefaultValue}  ref={inputClient} className="form-control form-control-lg">
                    <option disabled={true} value="">Escolha um cliente</option>
                    {value.clients && value.clients.map(function (item, i) {
                        return <option value={item.id} data-value={JSON.stringify(item)}>{item.name}</option>
                    })}
                </select>
                <div className="form-group">
                    <label for="formGroupExampleInput">Motivo</label>
                    <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient && value.selectedClient.reason} ref={inputReason} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput" class="mr-sm-2">Valor</label>
                    <div className="form-inline">
                        <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient && value.selectedClient.amount}  ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="R$" />
                    </div>
                </div>
                <div className="form-group">
                    <label for="formGroupExampleInput" class="mr-sm-2">Data</label>
                    <div className="form-inline">
                        <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient && value.selectedClient.when}  ref={inputWhen} type="date" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
                    </div>
                </div>
                <button onClick={() => handleClickExclude ()} type="button" class="btn btn-outline-secondary">Excluir</button>
                <button onClick={() => handleClickEdit ()} type="button" class="btn btn-outline-secondary">Editar</button>
                <button disabled={value.editMode ? false : true} onClick={() => handleClickSave ()} type="button" class="btn btn-outline-primary">Salvar</button>
            </form>
        </>
    );
}

export default NewForm;