import React from 'react';
import Index from './paginas/Index';
import Navbar from './assets/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";





function App() {
  return(
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Index/>}/>       
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
