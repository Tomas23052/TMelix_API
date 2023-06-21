import '../style.css'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

function Series() {

  const baseURL = "https://localhost:7038/api/SeriesAPI";

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalCriado, setModalCriado] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);
  const [modalEliminado, setModalEliminado] = useState(false);

  const [serieSelecionada, setSerieSelecionada] = useState(
    {
      id: '',
      nome: '',
      titulo: '',
      imagem: null,
      sinopse: '',
      dataLancamento: '',
      classificacao: '',
      elenco: '',
      genero: '',
      temporada: '',
      episodio: '',
    }
  )

  const abrirFecharModalAdicionar = () => {
    setModalAdicionar(!modalAdicionar);
  }

  const abrirFecharModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirFecharModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const abrirFecharModalCriado = () => {
    setModalCriado(!modalCriado);
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
  }

  const abrirFecharModalEditado = () => {
    setModalEditado(!modalEditado);
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
  }

  const abrirFecharModalEliminado = () => {
    setModalEliminado(!modalEliminado);
    document.body.style.overflow = "visible";
    document.body.style.paddingRight = "0px";
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setSerieSelecionada({
      ...serieSelecionada, [name]: value
    });
    console.log(serieSelecionada);
  }

  const pedidoGet = async () => {
    await axios.get(baseURL)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      })

  }

  const selecionarSerie = (serie, opcao) => {
    setSerieSelecionada(serie);
    (opcao === "Editar") ?
      abrirFecharModalEditar() : abrirFecharModalEliminar();
  }

  const pedidoPost = async () => {
    delete serieSelecionada.id;
    axios.post(baseURL, serieSelecionada
    ).then(response => {
      setData(data.concat(response.data));
      setUpdateData(true);
      abrirFecharModalAdicionar();
      abrirFecharModalCriado();
    }).catch(error => {
      console.log(error);
    })
  }

  const pedidoPut = async () => {
    await axios.put(baseURL + "/" + serieSelecionada.id, serieSelecionada)
      .then(response => {
        var resposta = response.data;
        var dadosAuxiliar = data;
        dadosAuxiliar.map((serie) => {
          if (serie.id === serieSelecionada.id) {
            serie.titulo = resposta.titulo;
            serie.imagem = resposta.imagem;
            serie.sinopse = resposta.sinopse;
            serie.dataLancamento = resposta.dataLancamento;
            serie.classificacao = resposta.classificacao;
            serie.elenco = resposta.elenco;
            serie.genero = resposta.genero;
            serie.temporada = resposta.temporada;
            serie.episodio = resposta.episodio;
          }
        });
        setUpdateData(true);
        abrirFecharModalEditar();
        abrirFecharModalEditado();
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoDelete = async () => {
    await axios.delete(baseURL + "/" + serieSelecionada.id)
      .then(response => {
        setData(data.filter(serie => serie.id !== response.data));
        setUpdateData(true);
        abrirFecharModalEliminar();
        abrirFecharModalEliminado();
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    if (updateData) {
      pedidoGet();
      setUpdateData(false);
    }

  }, [updateData])

  return (
    <div className="series-container">
      <br />
      <h1>Series</h1>
      <br />
      <button onClick={() => abrirFecharModalAdicionar()} className='btn btn-success'>Adicionar Série</button>
      <br />
      <table className='table table-dark table-striped mt-4'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Imagem</th>
            <th>Sinopse</th>
            <th>Lançamento</th>
            <th>Classificação</th>
            <th>Elenco</th>
            <th>Género</th>
            <th>Temporadas</th>
            <th>Episódios</th>
            <th>Operação</th>
          </tr>
        </thead>
        <tbody>
          {data.map(serie => (
            <tr key={serie.id}>
              <td>{serie.id}</td>
              <td>{serie.titulo}</td>
              <td><img src={serie.imagem} width="70" height="100" alt="" /></td>
              <td className="sinopse">{serie.sinopse}</td>
              <td>{formatDate(serie.dataLancamento)}</td>
              <td>{serie.classificacao}</td>
              <td>{serie.elenco}</td>
              <td>{serie.genero}</td>
              <td>{serie.temporada}</td>
              <td>{serie.episodio}</td>
              <td>
                <div className="button-container">
                  <button className="btn btn-primary" onClick={() => selecionarSerie(serie, "Editar")}>
                    Editar
                  </button>{" "}
                  <button className="btn btn-danger" onClick={() => selecionarSerie(serie, "Eliminar")}>
                    Eliminar
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalAdicionar}>
        <ModalHeader>Adicionar Série</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Título:</label>
            <br />
            <input type="text" className='form-control' name="titulo" onChange={handleChange} />
            <label>Imagem:</label>
            <br />
            <input type="text" className='form-control' name="imagem" onChange={handleChange} />
            <label>Sinopse:</label>
            <br />
            <input type="text" className='form-control' name="sinopse" onChange={handleChange} />
            <label>Data de Lançamento:</label>
            <br />
            <input type="date" className='form-control' name="dataLancamento" onChange={handleChange} />
            <label>Classificação:</label>
            <br />
            <input type="number" className='form-control' name="classificacao" onChange={handleChange} />
            <label>Elenco:</label>
            <br />
            <input type="text" className='form-control' name="elenco" onChange={handleChange} />
            <label>Género:</label>
            <br />
            <input type="text" className='form-control' name="genero" onChange={handleChange} />
            <br />
            <label>Nº Temporadas:</label>
            <br />
            <input type="number" className='form-control' name="temporada" onChange={handleChange} />
            <label>Nº Episódios:</label>
            <br />
            <input type="number" className='form-control' name="episodio" onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button> {"   "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Série</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID:</label> <br />
            <input type="text" className="form-control" readOnly value={serieSelecionada && serieSelecionada.id} /><br />
            <label>Título:</label>
            <br />
            <input type="text" className='form-control' name="titulo" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.titulo} />
            <label>Imagem:</label>
            <br />
            <input type="text" className='form-control' name="imagem" onChange={handleChange} value={serieSelecionada && serieSelecionada.imagem} />
            <label>Sinopse:</label>
            <br />
            <input type="text" className='form-control' name="sinopse" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.sinopse} />
            <label>Data de Lançamento:</label>
            <br />
            <input type="date" className='form-control' name="dataLancamento" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.dataLancamento} />
            <label>Classificação:</label>
            <br />
            <input type="number" className='form-control' name="classificacao" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.classificacao} />
            <label>Elenco:</label>
            <br />
            <input type="text" className='form-control' name="elenco" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.elenco} />
            <label>Género:</label>
            <br />
            <input type="text" className='form-control' name="genero" onChange={handleChange}
              value={serieSelecionada && serieSelecionada.genero} />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Confirma a exclusão deste Série : {serieSelecionada && serieSelecionada.titulo} ?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-danger' onClick={() => pedidoDelete()}> Sim </button>
          <button className='btn btn-secondary' onClick={() => abrirFecharModalEliminar()}> Não </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalCriado}>
        <ModalHeader>Série Adicionada</ModalHeader>
        <ModalBody>
          <div>A série que introduziu foi adicionado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={() => abrirFecharModalCriado()}>OK!</ModalFooter>
      </Modal>

      <Modal isOpen={modalEditado}>
        <ModalHeader>Série Editada</ModalHeader>
        <ModalBody>
          <div>A série foi editado com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={() => abrirFecharModalEditado()}>OK!</ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminado}>
        <ModalHeader>Série Eliminada</ModalHeader>
        <ModalBody>
          <div>A série foi eliminada com sucesso!</div>
        </ModalBody>
        <ModalFooter className="btn btn-primary" onClick={() => abrirFecharModalEliminado()}>OK!</ModalFooter>
      </Modal>


    </div>
  );
}

export default Series;