import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';



function Navbar() {
  return (
    <div className='navbar1'>
      <ul>
        <li><Link className="nav-link1" to="/"><li>Página Inicial</li></Link></li>
        <li><Link className="nav-link1" to="/Filmes"><li>Filmes</li></Link></li>
        <li><Link className="nav-link1" to="/Series"><li>Séries</li></Link></li>
        <li><Link className="nav-link1" to="/Subscricoes"><li>Subscrições</li></Link></li>
        <li><Link className="nav-link1" to="/Utilizadores"><li>Utilizadores</li></Link></li>
        <li><Link className="nav-link1" to="/Sobre"><li>Sobre</li></Link></li>

      </ul>
    </div>

  );
}

export default Navbar;
