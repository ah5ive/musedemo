import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { hot } from 'react-hot-loader';
import Register from './components/register/register';

class App extends React.Component {
    constructor() {
        super();
        this.state = {

        }

        }
    render() {

        return (
            <Router>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>

                        </ul>

                </nav>
                <h2>Muse Demo</h2>
                        <Route exact path="/register" component={Register} />

                </div>
            </Router>
        );
    }}

export default hot(module)(App);