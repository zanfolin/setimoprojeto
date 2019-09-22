import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

export default class alterar extends Component {

  constructor(props) {

    super(props);

        this.state = { id: 0, dados: [], 
                       tarefa: '', erro: '',
                       excluir: '', mostrarErro: 'invisible'};

    this.validaFormulario = this.validaFormulario.bind(this);
    this.atualizarTarefa = this.atualizarTarefa.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    let url = `http://localhost:3001/lista/${id}`;

    fetch(url)
    .then(res => res.json())
    .then((data) => {
        this.setState( {tarefa : data.tarefa })
        
    })
    .then (() => {
      this.setState({id});
    })
    .then (() => {
      //console.log(this.state.dados);
    })
  }

  validaFormulario(e) {
    e.preventDefault();

    if(this.state.tarefa.length<=0){
        this.setState({erro: 'Entre com algum valor para a Tarefa',
                        mostrarErro: 'visible'});
        return;
    }

    const novoItem = {
        //id: this.state.id,
        tarefa: this.state.tarefa
    }

    this.atualizarTarefa(novoItem);

    this.setState({ id: 0,
                    tarefa: '', 
                    erro: '',
                    mostrarErro: 'invisible'});

  }

  atualizarTarefa(item) {
    let options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }
      return fetch(`http://localhost:3001/lista/${this.state.id}`, options)
        .then((response) => response.json)
        .then(()=>{
          this.props.history.push('/');
        }) 
            
  }

  excluirTarefa(id) {
    let options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      return fetch('http://localhost:3001/lista/'+id, options)
        .then((response) => response.json)
        .then(()=>{
          this.props.history.push('/');
        }) 
  }

  render() {
    return (
      <div>
        <form onSubmit={this.validaFormulario} className="form-inline">
            <div className="form-group">
                <label htmlFor="tarefa" >
                    Indique a Tarefas
                </label><br/>
                <input id="tarefa" className="form-control mx-2"
                onChange={ (e) => { this.setState({tarefa: e.target.value})}}
                value={this.state.tarefa} />
            </div>
            
            <div className="form-group mx-3">
                <Button type="submit">
                    Alterar Tarefa
                </Button>  
                <Button href="/" variant="info" >
                    Voltar
                </Button>  
                <Button variant="danger" onClick={(e)=> this.excluirTarefa(this.state.id)} >
                    Excluir
                </Button>  
                
            </div>
            <br />
        </form>
        <div className={`alert alert-warning ${this.state.mostrarErro}`} role="alert">
                {this.state.erro}
        </div>
      </div>
      );
  }
}
