import { useState, useEffect } from "react";

import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function Subscricoes() {
    const [data1, setData1] = useState([]);
    const baseUrl1 = "https://localhost:7038/api/UtilizadoresAPI";
    const [updateData1, setUpdateData1] = useState([]);
    const [data2, setData2] = useState([]);
    const baseUrl2 = "https://localhost:7038/api/FilmesAPI";
    const [updateData2, setUpdateData2] = useState([]);
    const [data3, setData3] = useState([]);
    const baseUrl3 = "https://localhost:7038/api/SeriesAPI";
    const [updateData3, setUpdateData3] = useState([]);
    const baseUrl = "https://localhost:7038/api/SubscricoesAPI";
    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalCriado, setModalCriado] = useState(false);
    const [modalEditado, setModalEditado] = useState(false);

    const [subscricaoSelecionada, setSubscricaoSelecionada] = useState({
        id: '',
        utilizador: '',
        duracao: '',
        preco: '',
        auxPreco: '',
        dataInicio: '',
        dataFim: '',
        filmes: '',
        series: ''
    })

    const selecionarSubscricao = (elemento, caso) => {
        setSubscricaoSelecionada(elemento);
        (caso === "Editar") ?
            abrirFecharModalEditar() : abrirFecharModalEliminar();
    }

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
    }

    const abrirFecharModalEditado = () => {
        setModalEditado(!modalEditado);
    }

    const handleUtilizadorChange = e => {
        setSubscricaoSelecionada({
            ...subscricaoSelecionada,
            utilizador: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const handleFilmeChange = e => {
        setSubscricaoSelecionada({
            ...subscricaoSelecionada,
            filmes: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const handleSerieChange = e => {
        setSubscricaoSelecionada({
            ...subscricaoSelecionada,
            series: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const handleAuxPrecoChange = e => {
        setSubscricaoSelecionada({
            ...subscricaoSelecionada, preco: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const pedidoGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoGet1 = async () => {
        await axios.get(baseUrl1)
            .then(response => {
                setData1(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoGet2 = async () => {
        await axios.get(baseUrl2)
            .then(response => {
                setData2(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoGet3 = async () => {
        await axios.get(baseUrl3)
            .then(response => {
                setData3(response.data);
            }).catch(error => {
                console.log(error);
            })
    }

    const pedidoPost = async () => {
        delete subscricaoSelecionada.id;
        const formData = new FormData();
        formData.append("nomeUtilizador", subscricaoSelecionada.utilizador);
        formData.append("nomeFilme", subscricaoSelecionada.nomeFilme);
        formData.append("preco", subscricaoSelecionada.preco);
        formData.append("auxPreco", subscricaoSelecionada.auxPreco);
        formData.append("dataInicio", subscricaoSelecionada.dataInicio);
        formData.append("dataFim", subscricaoSelecionada.dataFim);
        axios.post(baseUrl, formData, {
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response => {
            setData(data.concat(response.data));
            setUpdateData(true);
            abrirFecharModalAdicionar();
            abrirFecharModalCriado();
        }).catch(error => {
            console.log(error);
        })

    }

    const pedidoPut = async () => {
        console.log(subscricaoSelecionada.id)
        await axios.put(baseUrl + "/" + subscricaoSelecionada.id, subscricaoSelecionada)
            .then(response => {
                var resposta = response.data;
                var dataAuxiliar = data;
                dataAuxiliar.map(subscricao => {
                    if (subscricao.id === subscricaoSelecionada.id) {
                        subscricao.nomeUtilizador = resposta.nomeUtilizador;
                        subscricao.nomeFilme = resposta.nomeFilme;
                        subscricao.preco = resposta.preco;
                        subscricao.dataInicio = resposta.dataInicio;
                        subscricao.dataFim = resposta.dataFim;
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
        await axios.delete(baseUrl + "/" + subscricaoSelecionada.id)
            .then(response => {
                setData(data.filter(subscricao => subscricao.id !== response.data));
                setUpdateData(true);
                abrirFecharModalEliminar();
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

    useEffect(() => {
        if (updateData1) {
            pedidoGet1();
            setUpdateData1(false);
        }
    }, [updateData1])

    useEffect(() => {
        if (updateData2) {
            pedidoGet2();
            setUpdateData2(false);
        }
    }, [updateData2])

    useEffect(() => {
        if (updateData3) {
            pedidoGet3();
            setUpdateData3(false);
        }
    }, [updateData3])

    return (
        <div style={{ textAlign: 'center' }}>
            <br />
            <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}>Adicionar Subscrição</button>
            <br /><br />
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Utilizador</th>
                        <th>Duração</th>
                        <th>Preço</th>
                        <th>Data de Início</th>
                        <th>Data de Fim</th>
                        <th>Filmes</th>
                        <th>Séries</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((subscricao, i) => (
                        <tr key={subscricao.id}>
                            <td>{subscricao.id}</td>
                            <td>{subscricao.utilizador.nome}</td>
                            <td>{subscricao.duracao}</td>
                            <td>{subscricao.preco}</td>
                            <td>{subscricao.dataInicio}</td>
                            <td>{subscricao.dataFim}</td>
                            <td>{subscricao.filmes.map(filme => filme.titulo).join(', ')}</td>
                            <td>{subscricao.series.map(serie => serie.titulo).join(', ')}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selecionarSubscricao(subscricao, "Editar")}>Editar</button>{" "}
                                <button className="btn btn-danger" onClick={() => selecionarSubscricao(subscricao, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <Modal isOpen={modalAdicionar}>
                <ModalHeader>Adicionar Subscrição</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Utilizador: </label>
                        <br />
                        <select className="form-control" name="utilizador" onChange={handleUtilizadorChange}>
                            <option value="">--Escolha o Utilizador--</option>
                            {data1.map(utilizador => (
                                <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
                            ))}
                        </select>
                        <br />
                        <label>Filme: </label>
                        <br />
                        <select className="form-control" name="filme" onChange={handleFilmeChange}>
                            <option value="">--Escolha o Filme--</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.id}>{filme.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Série: </label>
                        <select className="form-control" name="serie" onChange={handleSerieChange}>
                            <option value="">--Escolha a Série--</option>
                            {data3.map(serie => (
                                <option key={serie.id} value={serie.id}>{serie.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço: </label>
                        <select className="form-control" onChange={handleAuxPrecoChange}>
                            <option value="">--Escolha o Preço--</option>
                            <option value="10.99">10,99€ por 1 mês</option>
                            <option value="39.99">39,99€ por 6 meses</option>
                            <option value="69.99">69,99€ por 12 meses</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button>{" "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Subscrição</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Utilizador: </label>
                        <br />
                        <select className="form-control" onChange={handleUtilizadorChange}>
                            <option value="">--Escolha o Utilizador--</option>
                            {data1.map(utilizador => (
                                <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
                            ))}
                        </select>
                        <br />
                        <label>Filme: </label>
                        <br />
                        <select className="form-control"  onChange={handleFilmeChange}>
                            <option value="">--Escolha o Filme--</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.id}>{filme.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Série: </label>
                        <select className="form-control"onChange={handleSerieChange}>
                            <option value="">--Escolha a Série--</option>
                            {data3.map(serie => (
                                <option key={serie.id} value={serie.id}>{serie.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço: </label>
                        <select className="form-control" onChange={handleAuxPrecoChange}>
                            <option value="">--Escolha o Preço--</option>
                            <option value="10.99">10,99€ por 1 mês</option>
                            <option value="39.99">39,99€ por 6 meses</option>
                            <option value="69.99">69,99€ por 12 meses</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPut()}>Editar</button>{" "}
                    <button className="btn btn-danger" onClick={() => abrirFecharModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    Tem a certeza que deseja eliminar a Subscrição {subscricaoSelecionada && subscricaoSelecionada.id}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalEliminar()}>Não</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalCriado}>
                <ModalBody>
                    Subscrição criada com sucesso!
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => abrirFecharModalCriado()}>Ok</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditado}>
                <ModalBody>
                    Subscrição editada com sucesso!
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-success" onClick={() => abrirFecharModalEditado()}>Ok</button>
                </ModalFooter>
            </Modal>
        </div>
    );




}

export default Subscricoes;