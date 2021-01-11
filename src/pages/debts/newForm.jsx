import React, { useRef, useContext } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import { axiosPost } from '../../components/postData.jsx';
import { axiosDelete } from '../../components/deleteData.jsx';
import { API_RAILS } from '../../apiAccess/config.js';
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
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Cliente</span>
                </div>
                <select disabled={value.editMode ? false : true} defaultValue={value.selectedClient._id.$oid ? value.selectedClient.client.id : "" }  ref={inputClient} className="form-control form-control-lg">
                    <option disabled={true} value="">Escolha um cliente</option>
                    {value.clients.map(function (item, i) {
                        return <option key={new Date().getTime() + i} value={item.id} data-value={JSON.stringify(item)}>{item.name}</option>
                    })}
                </select>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Motivo</span>
                </div>
                <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.reason} ref={inputReason} type="text" className="form-control" id="formGroupExampleInput" placeholder="" />
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Valor</span>
                </div>
                <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.amount}  ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" className="form-control" id="formGroupExampleInput" placeholder="R$" />
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Data</span>
                </div>
                <input disabled={value.editMode ? false : true} defaultValue={value.selectedClient.when}  ref={inputWhen} type="date" className="form-control" id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
            </div>
            <button onClick={() => handleClickExclude ()} type="button" className="btn btn-outline-danger mr-2">Excluir</button>
            <button onClick={() => handleClickEdit ()} type="button" className="btn btn-outline-secondary mr-2">Editar</button>
            <button disabled={value.editMode ? false : true} onClick={() => handleClickSave ()} type="button" className="btn btn-outline-primary">Salvar</button>
        </form>

    );
}

export default NewForm;