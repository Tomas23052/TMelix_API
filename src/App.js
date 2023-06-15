import React from 'react';
import Index from './paginas/Index';
import Subscricoes from './paginas/Subscricoes';
import Filmes from './paginas/Filmes';
import Series from './paginas/Series';
import Utilizadores from './paginas/Utilizadores';
import Navbar from './assets/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";





function App() {
  return(
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Index/>}/> 
            <Route exact path="/Subscricoes" element={<Subscricoes/>}/>       
            <Route exact path="/Filmes" element={<Filmes/>}/>       
            <Route exact path="/Series" element={<Series/>}/>       
            <Route exact path="/Utilizadores" element={<Utilizadores/>}/>       

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
