import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

//import Main from './main';
import Dashboard from './dashboard';
import Sobre from './sobre';
import Cadastrar from './cadastrar';

//<Route exact path="/" component={Main} /> 

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/cadastrar" component={Cadastrar} />
        </Switch>
    </BrowserRouter>
);

export default Routes;