import React, { useRef, useContext, useState } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import { axiosPost } from '../../components/postData.jsx';
import { axiosDelete } from '../../components/deleteData.jsx';
import { API_RAILS } from '../../apiAccess/config.js';
import '../../components/styles/newForm.css';

function NewForm () {

    const value = useContext(DebtsContext);

    const [iClient, setiClient] = useState(false);
    const [iReason, setiReason] = useState(false);
    const [iWhen, setiWhen] = useState(false);
    const [iAmount, setiAmount] = useState(false);



    /* Declaring Form references */
    const inputClient = useRef(null);  const inputReason = useRef(null);
    const inputAmount = useRef(null);   const inputWhen = useRef(null);
   
    const getInputData = () => {
        const selected = inputClient.current.selectedIndex;
        const myClient = inputClient.current[selected].getAttribute("data-value");
        const oid = value.selectedClient._id.$oid ? value.selectedClient._id.$oid : 0;

        let errors_count = 0;

        setiClient(false); setiReason(false); setiAmount(false); setiWhen(false);

        if(inputClient.current[selected].value === "") {
           setiClient(true);
           errors_count += 1;
        }

        if(inputReason.current.value.trim() === "") {
          setiReason(true);
          errors_count += 1;
        }

        if(inputAmount.current.value === "") {
            setiAmount(true);
           errors_count += 1;
        }

        if(inputWhen.current.value === "") {
            setiWhen(true);
            errors_count += 1;
        }

        if(errors_count > 0) {
            return null;
        }

        const dataPost = {
            debt: {
                id: oid,
                reason:inputReason.current.value,
                amount:inputAmount.current.value,
                when:inputWhen.current.value,
                client: myClient
            }
        };
        return dataPost;
    }

    const sendToAPI = (dataPost) => {
        /* Send form to the API, all post data is treated by postData.jsx */
        axiosPost(dataPost, API_RAILS).then((response) => {
            /* In case Data is retrieved, status 200 */
            if(response.status === 200) {
                /*  Detect if User is Creating a record or Updating an existing one */
                if(value.selectedIdArray === null) {
                    value.updateSaveDebts(response.data.debt);
                } else {
                    value.updateEditDebts(response.data.debt, value.selectedIdArray);
                }
                value.updateSelectedClient(response.data.debt);
                value.updateEditMode(false);
            } else {
                /* Error */
                console.log("Requisição ao servidor retornou uma falha.");
            }
        });
    }
    
    /* Get Form Data and Send it to local API */
    const handleClickSave = () => {

        const dataPost = getInputData();
        
        if (dataPost) {
            sendToAPI(dataPost);
        }
    }

    /* User really wants to delete this record */
    const confirmDelete = () => {
        axiosDelete(API_RAILS, value.selectedClient._id.$oid).then(response => {
            if(response.status === 200) {
                value.updateExcludeDebts(value.selectedIdArray);
                value.updateSelectedClient(value.initialDebt);
                
            } else {
                console.log("Falhou!");
            }
        });
    }

    /* Ask user if he really wants to delete this record */
    const handleClickExclude = () => {
        if (window.confirm('Tem certeza que deseja deletar este registro?')) {
            confirmDelete();
        }
    }

    /* Change inputs from disabled to enabled */
    const handleClickEdit = () => {
        value.updateEditMode(true);
    }
    
    return(
        <form key={new Date().getTime()}>
            <div class="form-floating">
                <select disabled={value.editMode ? false : true} defaultValue={value.selectedClient._id.$oid ? value.selectedClient.client.id : "" }  ref={inputClient} className={`form-select mb-3 ${iClient ? 'is-invalid' : ''}`}>
                    <option disabled={true} value="">Nenhum</option>
                    {value.clients.map(function (item, i) {
                        return <option key={new Date().getTime() + i} value={item.id} data-value={JSON.stringify(item)}>{item.name}</option>
                    })}
                </select>
                <label for="floatingSelect is-invalid">{ iClient ? 'Este campo é obrigatório': 'Selecione o Cliente'}</label>
            </div>

            <div class="form-floating">
                <textarea disabled={value.editMode ? false : true} defaultValue={value.selectedClient.reason} ref={inputReason} style={{height: 100}} className={`form-control mb-3 ${iReason ? 'is-invalid' : ''}`} placeholder="" />
                <label for="floatingTextarea2">Motivo</label>
            </div>

            <form class="form-floating">
                <input id="floatingInputInvalid" disabled={value.editMode ? false : true} defaultValue={value.selectedClient.amount}  ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" className={`form-control mb-3 ${iAmount ? 'is-invalid' : ''}`} placeholder="R$" />
                
                <label for="floatingInputInvalid">{ iAmount ? 'Valor inválido' : 'Valor'}</label>
            </form>

            <form className="form-floating">
                <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.when}  ref={inputWhen} type="date" className={`form-control mb-3 ${iWhen ? 'is-invalid' : ''}`} id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
                <label for="floatingInputInvalid">Data</label>
            </form>

            <button onClick={() => handleClickExclude ()} type="button" className="btn btn-outline-danger m-2">Excluir</button>
            <button onClick={() => handleClickEdit ()} type="button" className="btn btn-outline-secondary m-2">Editar</button>
            <button disabled={value.editMode ? false : true} onClick={() => handleClickSave ()} type="button" className="btn btn-outline-primary m-2">Salvar</button>
        </form>

    );
}

export default NewForm;