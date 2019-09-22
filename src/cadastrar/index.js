import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

// import { Container } from './styles';

export default class main extends Component {
    constructor(props) {
        super(props);

        this.state = { tarefa: '', erro: '', excluir: '', mostrarErro: 'invisible'};

        this.validaFormulario = this.validaFormulario.bind(this);
        this.adicionarLista = this.adicionarLista.bind(this);

    }

    validaFormulario(e) {
        e.preventDefault();

        if(this.state.tarefa.length<=0){
            this.setState({erro: 'Entre com algum valor para a Tarefa',
                            mostrarErro: 'visible'});
            return;
        }

        const novoItem = {
            id: Date.now(),
            tarefa: this.state.tarefa
        }

        this.adicionarLista(novoItem);

        this.setState({ tarefa: '',
                        erro: '',
                        mostrarErro: 'invisible'});
    }

    adicionarLista(xlista) {
        let options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(xlista)
          }
          return fetch('http://localhost:3001/lista', options)
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
                
                <div className="form-group mx-sm-3 mb-2">
                    <Button type="submit">
                        Adicionar Lista
                    </Button>
                    <Button href="/" variant="info" >
                        Voltar
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
