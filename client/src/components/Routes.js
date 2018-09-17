import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Home from './../components/Home';
import Company from './../components/Company';
import CompanyForm from './../components/CompanyForm';
import Customer from './../components/Customer';
import CustomerForm from './../components/CustomerForm';

export class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/companies/create' component={CompanyForm}/>
                <Route path='/companies/:id' component={CompanyForm}/>
                <Route path='/companies' component={Company}/>
                <Route path='/customers/create' component={CustomerForm}/>
                <Route path='/customers/:id' component={CustomerForm}/>
                <Route path='/customers' component={Customer}/>
            </Switch>
        )
    }
}

export default Routes;
