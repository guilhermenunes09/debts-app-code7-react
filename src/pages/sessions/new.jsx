import React, { useRef, useContext } from 'react';
import { DebtsContext } from '../../contexts/currentClient.js';
import { axiosPost } from '../../components/postData.jsx';
import { API_RAILS_USER } from '../../apiAccess/config.js';
import { setLocalStorage } from '../../components/localStorage.jsx';
import { Link } from 'react-router-dom';

/* Login */
function SessionsNew (props) {
    /* We are using props to get history attributes and redirect */
    const value = useContext(DebtsContext);

    const inputLogin = useRef(null);
    const inputPassword = useRef(null);

    const handleClick = () => {
        const dataPost = {
            user: {
                email: inputLogin.current.value,
                password: inputPassword.current.value,
            }
        }
        /* Check postData.jsx for more details */
        axiosPost(dataPost, API_RAILS_USER.concat('/sign_in')).then(res => {
            if(res.status === 201) {
                console.log("SUCESS");
                /* Get Token, Access to the RAILS API */
                setLocalStorage('email',res.data.email);
                setLocalStorage('token', res.data.authentication_token);
                value.updateAuthorized(true);
                props.history.push("/");
            }
        })
    }

    return(
        <div className="row justify-content-center">
            <div className="dbt-new border border-info p-4 m-2 col-sm-6 p-4">
                <div className="bd-highlight">

                    <form className="text-left">
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">E-mail</label>
                            <input ref={inputLogin} type="email" className="form-control" id="formGroupExampleInput" placeholder="nome@email.com" />
                        </div>
                        <div className="form-group">
                            <label className="pl-2" for="formGroupExampleInput">Senha</label>
                            <input ref={inputPassword} type="password" className="form-control" id="formGroupExampleInput" placeholder="Min. 6 Caracteres" />
                        </div>
                    </form>
            
                </div>
                <button onClick={() => handleClick ()} type="button" className="btn btn-outline-primary mr-2">Entrar</button><br/>
                <Link to='/novo' >Registrar-se</Link>
            </div>
        </div>
    );
}

export default SessionsNew;