import './styles.css'
import React, {useState, useEffect} from 'react'

import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';


function Filmes() {
    
    const baseURL = "https://localhost:7038/api/FilmesAPI";

    const [data, setData]=useState([]);
    const [updateData, setUpdateData]=useState(true);
    const [modalAdicionar, setModalAdicionar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [modalCriado, setModalCriado]=useState(false);
    const [modalEditado, setModalEditado]=useState(false);
    const [modalEliminado, setModalEliminado]=useState(false);


    const [filmeSelecionado, setFilmeSelecionado] = useState(
        {
          id : '',
          titulo: '',
          imagem: null,
          sinopse: '',
          dataLancamento: '',
          classificacao: '',
          elenco: '',
          genero: '',
        }
      )

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

      const abrirFecharModalEliminado=()=>{
        setModalEliminado(!modalEliminado);
      }

      const handleChange=e=>{
        const {name, value}=e.target;
        setFilmeSelecionado({
          ...filmeSelecionado,
          [name]: value
        });
        console.log(filmeSelecionado);
      }

      const handleimageChange=e=>{
        const {name, files}=e.target;
        setFilmeSelecionado({
          ...filmeSelecionado,
          [name]: files[0]
        });
        console.log(filmeSelecionado);
      }

      const pedidosGet=async()=>{
        await axios.get(baseURL)
        .then(response=>{
          setData(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }

      const selecionarFilme=(filme, caso)=>{
        setFilmeSelecionado(filme);
        (caso==="Editar")?
        abrirFecharModalEditar():abrirFecharModalEliminar()
      }

      const pedidosPost = async () => {
        delete filmeSelecionado.id;
        axios.post(baseURL, filmeSelecionado
        ).then(response => {
          setData(data.concat(response.data));
          setUpdateData(true);
          abrirFecharModalAdicionar();
          abrirFecharModalCriado();
        }).catch(error => {
          console.log(error);
        })
      }

        const pedidosPut=async()=>{
          await axios.put(baseURL+"/"+filmeSelecionado.id, filmeSelecionado)
          .then(response=>{
            var resposta=response.data;
            var dadosAuxiliares=data;
            dadosAuxiliares.map(filme=>{
              if(filme.id===filmeSelecionado.id){
                filme.titulo=resposta.titulo;
                filme.imagem=resposta.imagem;
                filme.sinopse=resposta.sinopse;
                filme.dataLancamento=resposta.dataLancamento;
                filme.classificacao=resposta.classificacao;
                filme.elenco=resposta.elenco;
                filme.genero=resposta.genero;
              }
            });
            setUpdateData(true);
            abrirFecharModalEditar();
            abrirFecharModalEditado();
          }).catch(error=>{
            console.log(error);
          })
        }

          const pedidosDelete=async()=>{
            await axios.delete(baseURL+"/"+filmeSelecionado.id)
            .then(response=>{
              setData(data.filter(filme=>filme.id!==response.data));
              setUpdateData(true);
              abrirFecharModalEliminar();
              abrirFecharModalEliminado();
            }).catch(error=>{
              console.log(error);
            })
          }

          useEffect(()=>{
            if(updateData){
              pedidosGet();
              setUpdateData(false);
            }
          }
          , [updateData])

          return (
            <div className="Filmes">
              <div className="container">
                <br />
                <h1>Filmes</h1>
                <br />
                <button className="btn btn-success" onClick={()=>abrirFecharModalAdicionar()}>Adicionar Filme</button>
                <br /><br />
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Título</th>
                      <th>Imagem</th>
                      <th>Sinopse</th>
                      <th>Data de Lançamento</th>
                      <th>Classificação</th>
                      <th>Elenco</th>
                      <th>Gênero</th>
                      <th>Opções</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(filme=>(
                      <tr key={filme.id}>
                        <td>{filme.id}</td>
                        <td>{filme.titulo}</td>
                        <td><img src={filme.imagem} width="50" height="50" alt=""/></td>
                        <td>{filme.sinopse}</td>
                        <td>{filme.dataLancamento}</td>
                        <td>{filme.classificacao}</td>
                        <td>{filme.elenco}</td>
                        <td>{filme.genero}</td>
                        <td>
                          <button className="btn btn-primary" onClick={()=>selecionarFilme(filme, "Editar")}>Editar</button> {"  "}
                          <button className="btn btn-danger" onClick={()=>selecionarFilme(filme, "Eliminar")}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Modal isOpen={modalAdicionar}>
                  <ModalHeader>Adicionar Filme</ModalHeader>
                  <ModalBody>
                    <div className="form-group">
                      <label>Título: </label>
                      <br />
                      <input type="text" className="form-control" name="titulo" onChange={handleChange}/>
                      <br />
                      <label>Imagem: </label>
                      <br />
                      <input type="text" className="form-control" name="imagem" onChange={handleChange}/>
                      <br />
                      <label>Sinopse: </label>
                      <br />
                      <input type="text" className="form-control" name="sinopse" onChange={handleChange}/>
                      <br />
                      <label>Data de Lançamento: </label>
                      <br />
                      <input type="date" className="form-control" name="dataLancamento" onChange={handleChange}/>
                      <br />
                      <label>Classificação: </label>
                      <br />
                      <input type="text" className="form-control" name="classificacao" onChange={handleChange}/>
                      <br />
                      <label>Elenco: </label>
                      <br />
                      <input type="text" className="form-control" name="elenco" onChange={handleChange}/>
                      <br />
                      <label>Gênero: </label>
                      <br />
                      <input type="text" className="form-control" name="genero" onChange={handleChange}/>
                      <br />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>pedidosPost()}>Adicionar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirFecharModalAdicionar()}>Cancelar</button>
                  </ModalFooter>
                </Modal>
                
                <Modal isOpen={modalEditar}>
                  <ModalHeader>Editar Filme</ModalHeader>
                  <ModalBody>
                    <div className="form-group">
                      <label>ID: </label>
                      <br />
                      <input type="text" className="form-control" readOnly value={filmeSelecionado && filmeSelecionado.id}/>
                      <br />
                      <label>Título: </label>
                      <br />
                      <input type="text" className="form-control" name="titulo" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.titulo}/>
                      <br />
                      <label>Imagem: </label>
                      <br />
                      <input type="text" className="form-control" name="imagem" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.imagem}/>
                      <br />
                      <label>Sinopse: </label>
                      <br />
                      <input type="text" className="form-control" name="sinopse" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.sinopse}/>
                      <br />
                      <label>Data de Lançamento: </label>
                      <br />
                      <input type="text" className="form-control" name="dataLancamento" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.dataLancamento}/>
                      <br />
                      <label>Classificação: </label>
                      <br />
                      <input type="text" className="form-control" name="classificacao" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.classificacao}/>
                      <br />
                      <label>Elenco: </label>
                      <br />
                      <input type="text" className="form-control" name="elenco" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.elenco}/>
                      <br />
                      <label>Gênero: </label>
                      <br />
                      <input type="text" className="form-control" name="genero" onChange={handleChange} value={filmeSelecionado && filmeSelecionado.genero}/>
                      <br />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>pedidosPut()}>Editar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirFecharModalEditar()}>Cancelar</button>
                  </ModalFooter>
                </Modal>



                <Modal isOpen={modalEliminar}>
                  <ModalBody>
                    Confirma a exclusão deste Série : {filmeSelecionado && filmeSelecionado.titulo} ? 
                  </ModalBody>
                  <ModalFooter>
                    <button className='btn btn-danger' onClick={()=>pedidosDelete()}> Sim </button>
                    <button className='btn btn-secondary' onClick={()=> abrirFecharModalEliminar()}> Não </button>
                  </ModalFooter>
                </Modal>

                <Modal isOpen={modalCriado}>
                  <ModalHeader>Filme Adicionado</ModalHeader>
                  <ModalBody>
                    <div>O Filme que introduziu foi adicionado com sucesso!</div>
                  </ModalBody>
                  <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalCriado()}>OK!</ModalFooter>
                </Modal>

                <Modal isOpen={modalEditado}>
                  <ModalHeader>Filme Editado</ModalHeader>
                  <ModalBody>
                    <div>O Filme foi editado com sucesso!</div>
                  </ModalBody>
                  <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEditado()}>OK!</ModalFooter>
                </Modal>
                
                <Modal isOpen={modalEliminado}>
                  <ModalHeader>Filme Eliminado</ModalHeader>
                  <ModalBody>
                    <div>O Filme foi eliminado com sucesso!</div>
                  </ModalBody>
                  <ModalFooter className="btn btn-primary" onClick={()=>abrirFecharModalEliminado()}>OK!</ModalFooter>
                </Modal>

              </div>
            </div>
    );

}

export default Filmes;