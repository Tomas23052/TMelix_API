import '../style.css'
import React from 'react'
import logo from '../../assets/logo.png';
import melo from '../../paginas/melo.jpg';
import tomas from '../../paginas/tomas.jpg';
import { Link } from 'react-router-dom';
import '../style.css'

import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function Sobre() {
    return (
        <div className="App">
            <header className="App-header">
                <div class="row">
                    <div class="coluna">
                        <img src={melo} className="App-cara" alt="cara1" />
                    </div>
                    <div class="coluna">
                        <img src={tomas} className="App-cara" alt="cara1"/>
                    </div>
                <div className="descricao">
                    <p>Trabalho Final da unidade curricular de Desenvolvimento Web. TFlix é uma aplicação que disponibiliza uma vasta gama de filmes que posteriormente podem ser subscritos pelos utilizadores interessados, ficando disponíveis por um determinado tempo.</p>
                    <a href="https://github.com/ferndiogo/TFlix_DW">GitHub</a>
                    <br />
                    <a href="https://github.com/ferndiogo/TFlix_API">GitHub API</a>
                    <br/><br/><br/>
                <br></br>
                </div>

                </div>
                
            </header>
        </div>

        

    );
}

export default Sobre;