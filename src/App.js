import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './header/Header'
import Home from './home/Home';
import Admin from './admin/Admin';
import Comp from './comp/Comp';
import NavBar from './nav/NavBar';

import ContenderRegister from './comp/ContenderRegister';

import 'bootstrap/dist/css/bootstrap.css';
import EntryForm from './comp/EntryForm';
import JudgeRegistrationForm from './comp/JudgeRegistrationForm';
import ScoreSheetMain from './comp/scoresheet/ScoreSheetMain';
import MemberRegistrationForm from './admin/MemberRegistrationForm';
import EditCompetition from './admin/EditCompetition';


function App() {

    return (
        <Router>
            <Header/>
            <div className="App">
                <div className="container">
                    <Switch>
                        <Route exact path='/'>
                            <Home/>
                        </Route>
                        <Route exact path='/comp'>
                            <Comp/>
                        </Route>
                        <Route exact path='/admin'>
                            <Admin/>
                        </Route>
                        <Route exact path="/contender-register">
                            <ContenderRegister/>
                        </Route>
                        <Route exact path="/judge-register">
                            <JudgeRegistrationForm/>
                        </Route>
                        <Route exact path='/entry-form'>
                            <EntryForm/>
                        </Route>
                        <Route exact path='/scoresheet'>
                            <ScoreSheetMain/>
                        </Route>
                        <Route exact path='/member-register'>
                            <MemberRegistrationForm/>
                        </Route>
                        <Route exact path='/edit-competition'>
                            <EditCompetition/>
                        </Route>
                    </Switch>
                </div>
            </div>
            <NavBar/>
        </Router>
    );
}

export default App;
