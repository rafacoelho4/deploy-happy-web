import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/registered.css';
import success from '../images/successImg.svg';

const Registered = () => {
    return(
        <div id="registered-page">
            <main>
                <h2>Ebaaa!</h2>
                <p>O cadastro deu certo e já está disponível no site {':)'}</p>
                <button>
                    <Link to="/app" className="button-link-map">
                        Voltar para o mapa
                    </Link>
                </button>
            </main>

            <img src={success} alt="Congrats!"/>
        </div>
    );
}

export default Registered;