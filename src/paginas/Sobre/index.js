import '../style.css'
import React from 'react'
import melo from '../../assets/melo.jpg';
import tomas from '../../assets/tomas.jpg';
import '../style.css'


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
                    <a href="https://github.com/FMelo23155/TMelix">TMelix - MVC</a>
                    <br />
                    <a href="https://github.com/Tomas23052/TMelix_API">TMelix_API - React</a>
                    
                </div>

                </div>
                
            </header>
        </div>

        

    );
}

export default Sobre;