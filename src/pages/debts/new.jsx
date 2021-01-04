import React, { useState, useEffect } from 'react';

function DebtsNew (props) {

    return(
        <>
            <div className="container text-left">
                <div className="row">
                    <div className="col-sm-3 border border-danger">
                        One of three columns
                    </div>
                    <div className="col-sm-9 border border-danger">
                        <form>
                            <select className="form-control form-control-lg">
                                <option>Large select</option>
                            </select>
                            <div className="form-group">
                                <label for="formGroupExampleInput">Example label</label>
                                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" />
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput" class="mr-sm-2">Example label</label>
                                <div className="form-inline">
                                    <input type="number" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="Example input" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="formGroupExampleInput" class="mr-sm-2">Example label</label>
                                <div className="form-inline">
                                    <input type="number" class="form-control mb-2 mr-sm-2" id="formGroupExampleInput" placeholder="Example input" />
                                </div>
                            </div>

                            <button type="button" class="btn btn-outline-secondary">Excluir</button>
                            <button type="button" class="btn btn-outline-primary">Salvar</button>

                        </form>
                    </div>    
                </div>
            </div>
        </>
    )
}

export default DebtsNew;