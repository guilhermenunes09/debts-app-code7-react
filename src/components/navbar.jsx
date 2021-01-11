import React from 'react';
import { Link } from 'react-router-dom';

function Navbar () {
    return(
        <nav className="navbar navbar-dark bg-dark mb-4">
            <Link className="navbar-brand p-2" style={{marginLeft: 20}} to='/'>Debts App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <Link to="/" className="nav-link">Início<span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link to="/novo" className="nav-link">Registrar</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
            <span className="navbar-text">
            </span>
            </div>
        </nav>
    )
}

export default Navbar;