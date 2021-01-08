import React, { useRef } from 'react';


function SessionsNew () {


    const inputLogin = useRef(null);
    const inputPassword = useRef(null);

    const handleClick = () => {
        
    }

    return(
        <div className="row justify-content-center">
        <div className="dbt-new border border-info p-4 m-2 col-sm-6 p-4">
          
                <div className="bd-highlight">
         
                    <form className="text-left">
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">E-mail</label>
                            <input ref={inputLogin} type="email" class="form-control" id="formGroupExampleInput" placeholder="nome@email.com" />
                        </div>
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">Senha</label>
                            <input ref={inputPassword} type="password" class="form-control" id="formGroupExampleInput" placeholder="Min. 6 Caracteres" />
                        </div>
                    </form>
            
            </div>
            <button onClick={() => handleClick ()} type="button" class="btn btn-outline-primary mr-2">Entrar</button>
        </div>
        </div>
    );
}

export default SessionsNew;