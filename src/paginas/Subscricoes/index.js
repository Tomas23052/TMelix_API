import { useState, useEffect } from "react";

import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function Subscricoes(){
    const [data1, setData1] = useState([]);
    const baseUrl1="http://localhost:7038/api/UtilizadoresAPI";
    const [updateData1, setUpdateData1] = useState([]);
    const [data2, setData2] = useState([]);
    const baseUrl2="http://localhost:7038/api/FilmesAPI";
    const [updateData2, setUpdateData2] = useState([]);
    const [data3, setData3] = useState([]);
    const baseUrl3="http://localhost:7038/api/SeriesAPI";
    const [updateData3, setUpdateData3] = useState([]);
    const baseUrl = "http://localhost:7038/api/SubscricoesAPI";
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

    const selecionarSubscricao=(elemento, caso)=>{
        setSubscricaoSelecionada(elemento);
        (caso==="Editar")?
        abrirFecharModalEditar(): abrirFecharModalEliminar();
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

    const handleUtilizadorChange=e=>{
        setSubscricaoSelecionada({
            ...subscricaoSelecionada, utilizador: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const handleFilmeChange=e=>{
        setSubscricaoSelecionada({
            ...subscricaoSelecionada, filmes: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const handleSerieChange=e=>{
        setSubscricaoSelecionada({
            ...subscricaoSelecionada, series: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const handleAuxPrecoChange=e=>{
        setSubscricaoSelecionada({
            ...subscricaoSelecionada, auxPreco: e.target.value
        });
        console.log(subscricaoSelecionada);
    }

    const pedidoGet=async()=>{
        await axios.get(baseUrl)
        .then(response=>{
            setData(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const pedidoGet1=async()=>{
        await axios.get(baseUrl1)
        .then(response=>{
            setData1(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const pedidoGet2=async()=>{
        await axios.get(baseUrl2)
        .then(response=>{
            setData2(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const pedidoGet3=async()=>{
        await axios.get(baseUrl3)
        .then(response=>{
            setData3(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }

    const pedidoPost=async()=>{
        delete subscricaoSelecionada.id;
        const formData = new FormData();
        formData.append("nomeUtilizador", subscricaoSelecionada.utilizador);
        formData.append("nomeFilme", subscricaoSelecionada.nomeFilme);
        formData.append("preco", subscricaoSelecionada.preco);
        formData.append("auxPreco", subscricaoSelecionada.auxPreco);
        formData.append("dataInicio", subscricaoSelecionada.dataInicio);
        formData.append("dataFim", subscricaoSelecionada.dataFim);
        axios.post(baseUrl, formData,{
            headers: {
                'Content-Type': 'text/plain'
            }
        }).then(response=>{
            setData(data.concat(response.data));
            setUpdateData(true);
            abrirFecharModalAdicionar();
            abrirFecharModalCriado();
        }).catch(error=>{
            console.log(error);
        })

    }

    const pedidoPut=async()=>{
    }

}