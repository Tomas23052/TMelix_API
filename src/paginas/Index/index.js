import '../style.css'
import React from 'react'
import logo from '../../assets/logo.png';


function Index(){
    return(
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Esta aplicação web foi feita no intuito da Unidade Curricular Desenvolvimento Web, TMelix consiste numa aplicação que com uma subscrição, mensal ou anual nos deixa ter acesso à vasta gama de filmes e séries.</p>
          <p>Esta aplicação foi feita por: </p>
          <p>Francisco Soares Melo - 23155</p>
          <p>Tomás Silva - 23052</p>

        </header>

      </div>
    );
}

export default Index;