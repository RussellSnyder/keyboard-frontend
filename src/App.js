import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";


import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';


import {Nav} from "./components/Nav.component"
import {Home} from "./components/Home.component"
import {Song} from "./components/Song.component"
import {SongEdit} from "./components/SongEdit.component"
import {SongNew} from "./components/SongNew.component"

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

const About = () => (
    <div className="container py-4">
        <h2 className="text-center mb-4">I am Russell Snyder</h2>
        <p>And I wanna work with FlowKey :-)</p>
    </div>
)

// const Song = ({ match }) => {
//     return <div className="container py-4">
//         <Link className="btn btn-primary mb-4" to="/">&#8592; Back To Songs</Link>
//         <div className="row my-4">
//             {getSongData(match.params.id)}
//         </div>
//     </div>
// }

const App = () => (
    <ApolloProvider client={client}>
        <Router>
            <div className="container">
                <Nav active=""/>
                <Route exact={true} path="/" component={Home} />
                <Route exact={true} path="/about" component={About} />
                <Route exact={true} path="/new" component={SongNew} />
                <Route exact={true} path="/song/:id" component={Song} />
                <Route exact={true} path="/song/:id/edit" component={SongEdit} />
            </div>
        </Router>
    </ApolloProvider>
);

export default App;
