import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';



function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li><Link className="nav-link" to="/"><li>Página Inicial</li></Link></li>
        <li><Link className="nav-link" to="/Filmes"><li>Filmes</li></Link></li>
        <li><Link className="nav-link" to="/Series"><li>Séries</li></Link></li>
        <li><Link className="nav-link" to="/Subscricoes"><li>Subscrições</li></Link></li>
        <li><Link className="nav-link" to="/Utilizadores"><li>Utilizadores</li></Link></li>

      </ul>
    </div>

  );
}

export default Navbar;
