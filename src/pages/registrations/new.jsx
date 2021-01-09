import React, { useRef } from 'react';
import { axiosPost } from '../../components/postData.jsx';
import { API_RAILS_USER } from '../../apiAccess/config.js';
import { Link } from 'react-router-dom';

function RegistrationsNew () {

    const inputName = useRef(null);
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const inputPasswordConfirmation = useRef(null);

    const handleClick = () => {
        const dataPost = {
            user: {
                email: inputEmail.current.value,
                password: inputPassword.current.value,
                password_confirmation: inputPasswordConfirmation.current.value
            }
        }
        axiosPost(dataPost, API_RAILS_USER).then(res => {
            if(res.status === 201) {
                console.log("SUCESS");
            }
            console.log("Requested")
            console.log(res);
        })
    }

    return(
        <div className="row justify-content-center">
        <div className="dbt-new border border-info p-4 m-2 col-sm-6 p-4">
          
                <div className="bd-highlight">
         
                    <form className="text-left">
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">Nome</label>
                            <input ref={inputName} type="text" class="form-control" id="formGroupExampleInput" placeholder="Ex: José Silva" />
                        </div>
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">E-mail</label>
                            <input ref={inputEmail} type="email" class="form-control" id="formGroupExampleInput" placeholder="nome@email.com" />
                        </div>
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">Senha</label>
                            <input ref={inputPassword} type="password" class="form-control" id="formGroupExampleInput" placeholder="Min. 6 Caracteres" />
                        </div>
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">Confirmação de Senha</label>
                            <input ref={inputPasswordConfirmation} type="password" class="form-control" id="formGroupExampleInput" placeholder="Repita a Senha" />
                        </div>
                    </form>
            
            </div>
            <button onClick={() => handleClick ()} type="button" class="btn btn-outline-primary mr-2">Registrar</button><br />
            <Link to='/login' >Logar</Link>

        </div>
        </div>
    );
}

export default RegistrationsNew;