import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';



function Navbar() {
  return (
    <div className='navbar'>
      <ul>
        <li><Link className="nav-link" to="/"><li>Página Inicial</li></Link></li>
        <li><a href="default.asp">Filmes</a></li>
        <li><a href="news.asp">Séries</a></li>
        <li><a href="contact.asp">Subscrições</a></li>
        <li><a href="about.asp">Utilizadores</a></li>
      </ul>
    </div>

  );
}

export default Navbar;
