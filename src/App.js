import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import {Nav} from "./components/Nav/Nav.component"
import {Home} from "./components/Home/Home.component"
import {About} from "./components/About/About.component"
import {TestResults} from "./components/TestResults.component"
import {Song} from "./components/Song/Song.component"
import {SongEdit} from "./components/Song/SongEdit.component"
import {SongNew} from "./components/Song/SongNew.component"

import {getConstants} from './globals'

let CONSTANTS = getConstants();

const apolloClient = new ApolloClient({
  uri: CONSTANTS.APPOLLO_CLIENT_URL
});

export class App extends Component {
    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Router>
                    <div className="container">
                        <Nav active=""/>
                        <Route exact={true} path="/"
                               component={() => <Home
                                   disableTone={this.props.disableTone}/>} />
                        <Route exact={true} path="/tests" component={TestResults}/>
                        <Route exact={true} path="/about" component={About}/>
                        <Route exact={true} path="/new" component={SongNew}/>
                        <Route exact={true} path="/song/:id" component={Song}/>
                        <Route exact={true} path="/song/:id/edit" component={SongEdit}/>
                    </div>
                </Router>
            </ApolloProvider>
        )
    }
};

export default App;