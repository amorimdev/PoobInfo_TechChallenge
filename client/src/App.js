import React, {Component} from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import 'react-table/react-table.css'

import Routes from './components/Routes';
import Menu from './components/Menu';

class App extends Component {
    render() {
        return (
            <main className='container'>
                <Router>
                    <div>
                        <Menu/>
                        <Routes/>
                    </div>
                </Router>
            </main>
        );
    }
}

export default App;
