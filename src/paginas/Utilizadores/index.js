import React, {useState, useEffect} from "react";

import axios from "axios";
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function Utilizadores(){
    const baseUrl="https://localhost:7038/api/UtilizadoresAPI";

    const [data, setData]=useState([]);
    const [updateData, setUpdateData]=useState([]);
    const [modalAdicionar, setModalAdicionar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [modalCriado, setModalCriado]=useState(false);
    const [modalEditado, setModalEditado]=useState(false);

    const [utilizadorSelecionado, setUtilizadorSelecionado]=useState({
        id: '',
        nome: '',
        email: '',
        nif: '',
        morada: '',
        pais: '',
        codPostal: '',
        sexo: '',
        dataNasc: '',
        userF: '',
        userID: ''
     }
    )

    const selecionarUtilizador=(utilizador, caso)=>{
        setUtilizadorSelecionado(utilizador);
        (caso==="Editar")?
        abrirFecharModalEditar():abrirFecharModalEliminar()
    }

    const abrirFecharModalAdicionar=()=>{
        setModalAdicionar(!modalAdicionar);
    }

    const abrirFecharModalEditar=()=>{
        setModalEditar(!modalEditar);
    }

    const abrirFecharModalEliminar=()=>{
        setModalEliminar(!modalEliminar);
    }

    const abrirFecharModalCriado=()=>{
        setModalCriado(!modalCriado);
       
    }

    const abrirFecharModalEditado=()=>{
        setModalEditado(!modalEditado);
       
    }

    const handleChange=e=>{
        const {name, value}=e.target;
        setUtilizadorSelecionado({
            ...utilizadorSelecionado,
            [name]: value
        });
        console.log(utilizadorSelecionado);
    }

 
    const pedidoGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    

    const pedidoPost=async()=>{
        delete utilizadorSelecionado.id;
        await axios.post(baseUrl, utilizadorSelecionado)
        .then(response=>{
            setData(data.concat(response.data));
            setUpdateData(true);
            abrirFecharModalAdicionar();
        }).catch(error=>{
            console.log(error.response.data);
        })
    }

    const pedidoPut=async()=>{
        await axios.put(baseUrl+"/"+utilizadorSelecionado.id, utilizadorSelecionado)
        .then(response=>{
            var resposta=response.data;
            var dataAuxiliar=data;
            dataAuxiliar.map((utilizador)=>{
                if(utilizador.id===utilizadorSelecionado.id){
                    utilizador.nome=resposta.nome;
                    utilizador.email=resposta.email;
                    utilizador.nif=resposta.nif;
                    utilizador.morada=resposta.morada;
                    utilizador.pais=resposta.pais;
                    utilizador.codPostal=resposta.codPostal;
                    utilizador.sexo=resposta.sexo;
                    utilizador.dataNasc=resposta.dataNasc;
                    utilizador.userF=resposta.userF;
                    utilizador.userID=resposta.userID;
                }
            });
            setUpdateData(true);
            abrirFecharModalEditar();
            abrirFecharModalEditado();
        }).catch(error=>{
            console.log(error.response.data);
        })
    }

    const pedidoDelete=async()=>{
        await axios.delete(baseUrl+"/"+utilizadorSelecionado.id)
        .then(response=>{
            setData(data.filter(utilizador=>utilizador.id!==response.data));
            setUpdateData(true);
            abrirFecharModalEliminar();
        }).catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        pedidoGet();
        setUpdateData(false);
    }, [updateData])

    return(
        <div className="container">
            <br/><br/>
            <h1>Utilizadores</h1>
            <br/>
            <button className="btn btn-success" onClick={()=>abrirFecharModalAdicionar()}>Adicionar Utilizador</button>
            <br/><br/>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>NIF</th>
                        <th>Morada</th>
                        <th>País</th>
                        <th>Código Postal</th>
                        <th>Sexo</th>
                        <th>Data de Nascimento</th>
                        <th>Username</th>
                        <th>UserID</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(utilizador=>(
                        <tr key={utilizador.id}>
                            <td>{utilizador.id}</td>
                            <td>{utilizador.nome}</td>
                            <td>{utilizador.email}</td>
                            <td>{utilizador.nif}</td>
                            <td>{utilizador.morada}</td>
                            <td>{utilizador.pais}</td>
                            <td>{utilizador.codPostal}</td>
                            <td>{utilizador.sexo}</td>
                            <td>{utilizador.dataNasc}</td>
                            <td>{utilizador.userF}</td>
                            <td>{utilizador.userID}</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>selecionarUtilizador(utilizador, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={()=>selecionarUtilizador(utilizador, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalAdicionar}>
                <ModalHeader>Adicionar Utilizador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br/>
                        <input type="text" className="form-control" name="nome" onChange={handleChange}/>
                        <br/>
                        <label>Email: </label>
                        <br/>
                        <input type="text" className="form-control" name="email" onChange={handleChange}/>
                        <br/>
                        <label>NIF: </label>
                        <br/>
                        <input type="text" className="form-control" name="nif" onChange={handleChange}/>
                        <br/>
                        <label>Morada: </label>
                        <br/>
                        <input type="text" className="form-control" name="morada" onChange={handleChange}/>
                        <br/>
                        <label>País: </label>
                        <br/>
                        <input type="text" className="form-control" name="pais" onChange={handleChange}/>
                        <br/>
                        <label>Código Postal: </label>
                        <br/>
                        <input type="text" className="form-control" name="codPostal" onChange={handleChange}/>
                        <br/>
                        <label>Sexo: </label>
                        <br/>
                        <input type="text" className="form-control" name="sexo" onChange={handleChange}/>
                        <br/>
                        <label>Data de Nascimento: </label>
                        <br/>
                        <input type="date" className="form-control" name="dataNasc" onChange={handleChange}/>
                        <br/>
                        <label>Função: </label>
                        <br/>
                        <input type="text" className="form-control" name="userF" onChange={handleChange}/>
                        <label>UserID: </label>
                        <br/>
                        <input type="text" className="form-control" name="userID" onChange={handleChange}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>pedidoPost()}>Adicionar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Utilizador</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br/>
                        <input type="text" className="form-control" readOnly value={utilizadorSelecionado && utilizadorSelecionado.id}/>
                        <br/>
                        <label>Nome: </label>
                        <br/>
                        <input type="text" className="form-control" name="nome" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.nome}/>
                        <br/>
                        <label>Email: </label>
                        <br/>
                        <input type="text" className="form-control" name="email" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.email}/>
                        <br/>
                        <label>NIF: </label>
                        <br/>
                        <input type="text" className="form-control" name="nif" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.nif}/>
                        <br/>
                        <label>Morada: </label>
                        <br/>
                        <input type="text" className="form-control" name="morada" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.morada}/>
                        <br/>
                        <label>País: </label>
                        <br/>
                        <input type="text" className="form-control" name="pais" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.pais}/>
                        <br/>
                        <label>Código Postal: </label>
                        <br/>
                        <input type="text" className="form-control" name="codPostal" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.codPostal}/>
                        <br/>
                        <label>Sexo: </label>
                        <br/>
                        <input type="text" className="form-control" name="sexo" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.sexo}/>
                        <br/>
                        <label>Data de Nascimento: </label>
                        <br/>
                        <input type="date" className="form-control" name="dataNasc" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.dataNasc}/>
                        <br/>
                        <label>Função: </label>
                        <br/>
                        <input type="text" className="form-control" name="userF" onChange={handleChange} value={utilizadorSelecionado && utilizadorSelecionado.userF}/>
                        <label>UserID: </label>
                        <br/>
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>pedidoPut()}>Editar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Tem a certeza que quer eliminar o utilizador {utilizadorSelecionado && utilizadorSelecionado.nome}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>pedidoDelete()}>Sim</button>{"  "}
                    <button className="btn btn-secondary" onClick={()=>abrirFecharModalEliminar()}>Não</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalCriado}>
                <ModalBody>
                    Utilizador criado com sucesso!
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={()=>abrirFecharModalCriado()}>OK</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditado}>
                <ModalBody>
                    Utilizador editado com sucesso!
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={()=>abrirFecharModalEditado()}>OK</button>
                </ModalFooter>
            </Modal>

        </div>
    );
    
}

export default Utilizadores;

    


        