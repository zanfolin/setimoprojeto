import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

//import Main from './main';
import Dashboard from './dashboard';
import Sobre from './sobre';
import Cadastrar from './cadastrar';
import Alterar from './alterar';

//<Route exact path="/" component={Main} /> 
//<Route path="/alterar/:id"  render = { (props) => <Alterar {...props}/>} />
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/cadastrar" component={Cadastrar} />
            <Route path="/alterar/:id" component={Alterar} />
            
        </Switch>
    </BrowserRouter>
);

export default Routes;