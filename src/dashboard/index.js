import React, { Component } from 'react';

//import { Button, Pagination, Alert } from 'react-bootstrap';

import { Pagination, Table, Button, Nav } from 'react-bootstrap';

var rows = [];

export default class main extends Component {

    constructor(props) {
        super(props);

        this.state = { lista: [],
                       paginaAtual: 1,
                       itensPagina: 5,
                       totalItens: 0,
                       totalPaginas: 0,
                       itens: []};
        
        this.cliquePaginacao = this.cliquePaginacao.bind(this);
    }

    componentDidMount() {
        let url = "http://localhost:3001/lista";

        fetch(url)
        .then(res => res.json())
        .then((data) => {
            this.setState( {lista : data,
                            totalItens: data.length,
                            totalPaginas: Math.ceil(data.length / this.state.itensPagina)})

        })

        
        let paginacao = "http://localhost:3001/lista?_limit=5&_page=1"
        fetch(paginacao)
        .then(res => res.json())
        .then((data) => {
            this.setState( {itens : data })

        })
    }

    cliquePaginacao(e, id) {

        this.setState({paginaAtual: id});
        let paginacao = "http://localhost:3001/lista?_limit=" +this.state.itensPagina.toString() + "&_page=" + id.toString();
        fetch(paginacao)
        .then(res => res.json())
        .then((data) => {
            this.setState( {itens : data })

        })
    }

  render() {

    rows = [];
    for(let i=1; i<=this.state.totalPaginas; i++){
        rows.push(<Pagination.Item key={i}
                active={i === this.state.paginaAtual}
                onClick={(e)=> { this.cliquePaginacao(e, i)}}>{i}</Pagination.Item>)   
    }

    return (
        <div>
            <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col" className="col-6">Tarefa</th>
                <th scope="col">Opções</th>
                </tr>
            </thead>
            <tbody>
                {this.state.itens.map(
                    (item, index) => (
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td>{item.tarefa}</td>
                            <td className="text-right">
                                <Button variant="info" href={`/alterar/${item.id}`}>
                                    Informação
                                </Button>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
            </Table>
            <Nav className="justify-content-center align-center">
                <Pagination>{rows}</Pagination><br />
            </Nav>
            <Nav className="justify-content-end">
                <Button variant="secondary" href="/cadastrar">Cadastrar</Button>
            </Nav>
        </div>
    );
  }
}
