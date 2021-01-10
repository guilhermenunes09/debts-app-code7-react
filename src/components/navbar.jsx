import React from 'react';
import { Link } from 'react-router-dom';

function Navbar () {
    return(
        <nav class="navbar navbar-dark bg-dark mb-4">
            <Link className="navbar-brand" to='/'>Debts App</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                <a class="nav-link" href="#">Início<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Registrar</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
                </li>
            </ul>
            <span class="navbar-text">
                
            </span>
            </div>
        </nav>
    )
}

export default Navbar;