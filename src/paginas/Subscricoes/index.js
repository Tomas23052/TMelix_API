import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';





function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

function Subscricao() {

    const [data1, setData1] = useState([]);

    const baseUrl1 = "https://localhost:7038/api/UtilizadoresAPI";

    const [updateData1, setUpdateData1] = useState(true);

    const [data2, setData2] = useState([]);

    const baseUrl2 = "https://localhost:7038/api/FilmesAPI";

    const [updateData2, setUpdateData2] = useState(true);

    const [data3, setData3] = useState([]);

    const baseUrl3 = "https://localhost:7038/api/SeriesAPI";

    const [updateData3, setUpdateData3] = useState(true);

    const baseUrl = "https://localhost:7038/api/SubscricoesAPI";

    const [data, setData] = useState([]);

    const [updateData, setUpdateData] = useState(true);

    const [modalAdicionar, setModalAdicionar] = useState(false);

    const [modalApagar, setModalApagar] = useState(false);

    const [modalCriado, setModalCriado] = useState(false);

    const [subscricaoSelecionada, setsubscricaoSelecionada] = useState(
        {
            id: '',
            utilizador: {},
            duracao: null,
            preco: null,
            dataInicio: null,
            dataFim: null,
            UtilizadorFK: '',
            filmes: [],
            series: []
        }
    )

    const selecionarSubscricao = (subscricao, opcao) => {
        setsubscricaoSelecionada(subscricao);
        (opcao === "Apagar") ? 
            abrirFecharModalApagar() : abrirFecharModalAdicionar();
        
    }

    const abrirFecharModalAdicionar = () => {
        setModalAdicionar(!modalAdicionar);
    }

    const abrirFecharModalApagar = () => {
        setModalApagar(!modalApagar);
    }

    const abrirFecharModalCriado = () => {
        setModalCriado(!modalCriado);
    }


    const handleUtilizadorChange = (e) => {
        for (let i = 0; i < data1.length; i++) {
            if (data1[i].id == e.target.value) {
                setsubscricaoSelecionada({
                    ...subscricaoSelecionada, utilizador: data1[i], UtilizadorFK: data1[i].id
                   
                });
                console.log(subscricaoSelecionada.utilizador);
            }
        }

    }

    const handleFilmeChange = (e) => {
        for (let i = 0; i < data2.length; i++) {
            if (data2[i].id == e.target.value) {
                const filme = subscricaoSelecionada.filmes.slice();
                filme.push(data2[i]);
                setsubscricaoSelecionada((prevSubscricao) => ({
                    ...prevSubscricao,
                    filmes: [...filme],
                }));
                console.log(subscricaoSelecionada);
            }
        }


    };

    const handleSerieChange = (e) => {
        for (let i = 0; i < data3.length; i++) {
            if (data3[i].id == e.target.value) {
                const serie = subscricaoSelecionada.series.slice();
                serie.push(data3[i]);
                setsubscricaoSelecionada((prevSubscricao) => ({
                    ...prevSubscricao,
                    series: [...serie],
                }));
                console.log(subscricaoSelecionada);
            }
        }
    };

    const handleAuxPrecoChange = (e) => {
        setsubscricaoSelecionada({
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
        console.log(subscricaoSelecionada);
        delete subscricaoSelecionada.id;
        delete subscricaoSelecionada.dataFim;
        delete subscricaoSelecionada.dataInicio;
        delete subscricaoSelecionada.duracao;
        console.log(subscricaoSelecionada);
        axios.post(baseUrl, subscricaoSelecionada
        ).then(response => {
            setData(data.concat(response.data));
            setUpdateData(true);
            abrirFecharModalAdicionar();
            abrirFecharModalCriado();
        }).catch(error => {
            window.location.reload();
            console.log(error.response.data);
        })


    }
    


    const pedidoDelete = async () => {
        await axios.delete(baseUrl + "/" + subscricaoSelecionada.id)
            .then(response => {
                setData(data.filter(subscricao => subscricao.id !== response.data));
                setUpdateData(true);
                abrirFecharModalApagar();
            }).catch(error => {
                console.log(error);
            })
    }

    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData) {
            pedidoGet();
            setUpdateData(false);
        }
    }, [updateData])

    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData1) {
            pedidoGet1();
            setUpdateData1(false);
        }
    }, [updateData1])



    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData2) {
            pedidoGet2();
            setUpdateData2(false);
        }
    }, [updateData2])


    //impedir loop pedidoGet
    useEffect(() => {
        if (updateData3) {
            pedidoGet3();
            setUpdateData3(false);
        }
    }, [updateData2])


    return (
        <div className="subscricoes-container">

            <br />
            <br />
            <h3>Criação de Subscrição</h3>
            <button className="btn btn-success" onClick={() => abrirFecharModalAdicionar()}>Adicionar</button>

            <table className="table table-dark table-striped mt-4">
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
                        <th>Operação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((subscricao, i) => (

                        <tr key={subscricao}>
                            <td>{subscricao.id}</td>
                            <td>{subscricao.utilizador.nome}</td>
                            <td>{subscricao.duracao}</td>
                            <td>{subscricao.preco}</td>
                            <td>{formatDate(subscricao.dataInicio)}</td>
                            <td>{formatDate(subscricao.dataFim)}</td>
                            <td>{subscricao.filmes.map((filme) => filme.titulo).join(', ')}</td>
                            <td>{subscricao.series.map((serie) => serie.titulo).join(', ')}</td>

                            <td>
                                <button className="btn btn-danger" onClick={() => selecionarSubscricao(subscricao, "Apagar")}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalAdicionar}>
                <ModalHeader>Adicionar Subscrição</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Utilizador:</label>
                        <br />
                        <select className="form-select" onChange={handleUtilizadorChange}>
                            <option value="">Escolha um utilizador</option>
                            {data1.map(utilizador => (
                                <option key={utilizador.id} value={utilizador.id}>{utilizador.nome}</option>
                            ))}
                        </select>
                        <br />
                        <label>Filme:</label>
                        <select className="form-select" onChange={handleFilmeChange}>
                            <option value="">Escolha um flme</option>
                            {data2.map(filme => (
                                <option key={filme.id} value={filme.id} >{filme.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Série:</label>
                        <select className="form-select" onChange={handleSerieChange}>
                            <option value="">Escolha uma série</option>
                            {data3.map(serie => (
                                <option key={serie.id} value={serie.id} >{serie.titulo}</option>
                            ))}
                        </select>
                        <br />
                        <label>Preço:</label>
                        <br />
                        <select className="form-control" onChange={handleAuxPrecoChange}>
                            <option value="">Escolha uma opção</option>
                            <option value="10.99">10,99 por 1 mês</option>
                            <option value="39.99">39,99 por 6 meses</option>
                            <option value="69.99">69,99 por 12 meses</option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => pedidoPost()}>Adicionar</button>
                    <button className="btn btn-danger" onClick={() => abrirFecharModalAdicionar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalApagar}>
                <ModalBody>
                    Confirma a eliminação esta subscrição: {subscricaoSelecionada && subscricaoSelecionada.id} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => pedidoDelete()}>Sim</button>
                    <button className="btn btn-secondary" onClick={() => abrirFecharModalApagar()}>Não</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalCriado}>
                <ModalHeader>Subscrição Adicionada</ModalHeader>
                <ModalBody>
                    <div>A subscrição que introduziu foi adicionada com sucesso!</div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => abrirFecharModalCriado()}></button>
                </ModalFooter>
            </Modal>


        </div>
    );
}


export default Subscricao;