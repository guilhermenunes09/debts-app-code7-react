import React, { useRef, useContext, useState, useEffect } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import { axiosPost } from '../../components/postData.jsx';
import { axiosDelete } from '../../components/deleteData.jsx';
import { API_JSON, API_RAILS } from '../../apiAccess/config.js';
import '../../components/styles/newForm.css';

function NewForm () {
    const value = useContext(DebtsContext);

    /* Declaring Form references */
    const inputClient = useRef(null);  const inputReason = useRef(null);
    const inputAmount = useRef(null);   const inputWhen = useRef(null);
    

    /* Get Form Data and Send it to local API */
    const handleClickSave = () => {       
        const selected = inputClient.current.selectedIndex;
        const myClient = inputClient.current[selected].getAttribute("data-value");
        const oid = value.selectedClient._id.$oid ? value.selectedClient._id.$oid : 0;
        const dataPost = {
            debt: {
                id: oid,
                reason:inputReason.current.value,
                amount:inputAmount.current.value,
                when:inputWhen.current.value,
                client: myClient
            }
        };
        axiosPost(dataPost, API_RAILS).then((response) => {
            if(response.status === 200) {
                if(value.selectedIdArray === null) {
                    value.updateSaveDebts(response.data.debt);
                } else {
                    value.updateEditDebts(response.data.debt, value.selectedIdArray);
                }
                value.updateSelectedClient(response.data.debt);
                value.updateEditMode(false);

            } else {
                console.log("Requisição ao servidor retornou uma falha.");
            }
        });
    }

    const confirmDelete = () => {
        axiosDelete(API_RAILS, value.selectedClient._id.$oid).then(response => {
            console.log("CHECK DELETE RESPONSE");
            console.log(response);
            if(response.status == 200) {
                value.updateExcludeDebts(value.selectedIdArray);
                value.updateSelectedClient(value.initialDebt);
                
            } else {
                console.log("Falhou!");
            }
        });
    }

    const handleClickExclude = () => {

        if (window.confirm('Tem certeza que deseja deletar este registro?')) {
            confirmDelete();
        }

        

    }

    const handleClickEdit = () => {
        value.updateEditMode(true);
    }
    return(
        <>
            <form key={new Date().getTime()}>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Cliente</span>
                    </div>
                    <select disabled={value.editMode ? false : true} defaultValue={value.selectedClient._id.$oid ? value.selectedClient.client.id : "" }  ref={inputClient} className="form-control form-control-lg">
                        <option disabled={true} value="">Escolha um cliente</option>
                        {value.clients.map(function (item, i) {
                            return <option value={item.id} data-value={JSON.stringify(item)}>{item.name}</option>
                        })}
                    </select>
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Motivo</span>
                    </div>
                    <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.reason} ref={inputReason} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Valor</span>
                    </div>
                    <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.amount}  ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" class="form-control" id="formGroupExampleInput" placeholder="R$" />
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Data</span>
                    </div>
                    <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.when}  ref={inputWhen} type="date" class="form-control" id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
                </div>



                <button onClick={() => handleClickExclude ()} type="button" class="btn btn-outline-danger mr-2">Excluir</button>
                <button onClick={() => handleClickEdit ()} type="button" class="btn btn-outline-secondary mr-2">Editar</button>
                <button disabled={value.editMode ? false : true} onClick={() => handleClickSave ()} type="button" class="btn btn-outline-primary">Salvar</button>
            </form>
        </>
    );
}

export default NewForm;