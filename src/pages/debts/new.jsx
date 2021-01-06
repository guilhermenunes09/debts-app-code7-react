import React, { useState, useEffect, useRef, createContext } from 'react';
import DebtsList from '../../components/debtsList.jsx';
import { axiosPost } from '../../components/postData.jsx';
import { API_RAILS } from '../../apiAccess/config.js';
import '../../components/styles/debtsNew.css';
import { idContext } from '../../contexts/idContext.js';

function DebtsNew (props) {

    let [id, setId] = useState(0);
    const inputClient = useRef(null);
    const inputReason = useRef(null);
    const inputAmount = useRef(null);
    const inputWhen = useRef(null);
    
    let value = {
        id: id,
        updateId: updateId
    }


    const handleClick = () => {
        console.log("Clicking");
        console.log(inputReason.current.value);
        console.log(inputAmount.current.value);
        console.log(inputWhen.current.value);
        console.log(inputClient.current.value);
       
        const dataPost = {
            reason:inputReason.current.value,
            amount:inputAmount.current.value,
            when:inputWhen.current.value,
            client: inputClient.current.value,
        };

        axiosPost(dataPost, API_RAILS);
    }

    function updateId (key, id) {
        console.log("Lets Update");
        setId(id);
     }

    return(
        <idContext.Provider value={{value}}>
            <div className="container text-left">
                <div className="row">
                    <div className="col-sm-3 border border-danger">
                        <DebtsList clientsProp={props.clientsProp} />
                    </div>
                    <div className="col-sm-9 border border-warning">
                        <div className="debt-new d-flex p-4 m-2 border border-info bd-highlight">
                            <form>
                                <select ref={inputClient} className="form-control form-control-lg">
                                    {props.clientsProp && props.clientsProp.map(function (item, i) {
                                        return <option value={JSON.stringify(item)}>{item.name}</option>
                                    })}
                                </select>
                                <div className="form-group">
                                    <label for="formGroupExampleInput">Motivo</label>
                                    <input ref={inputReason} type="text" class="form-control" id="formGroupExampleInput" placeholder="" />
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput" class="mr-sm-2">Valor</label>
                                    <div className="form-inline">
                                        <input ref={inputAmount} type="number" min="0.00" max="9000000.00" step="0.01" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="R$" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="formGroupExampleInput" class="mr-sm-2">Data</label>
                                    <div className="form-inline">
                                        <input ref={inputWhen} type="date" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="Ex: 10-12-2020" />
                                    </div>
                                </div>

                                <input type="hidden" name="id" value="0" />

                                <button type="button" class="btn btn-outline-secondary">Excluir</button>
                                <button onClick={handleClick} type="button" class="btn btn-outline-primary">Salvar</button>

                            </form>
                        </div>
                    </div>    
                </div>
            </div>
        </idContext.Provider>
    )
}

export default DebtsNew;