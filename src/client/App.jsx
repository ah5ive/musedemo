import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { hot } from 'react-hot-loader';
import Register from './components/register/register';
import Main from './components/main/main';

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
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/" component={Main} />

                </div>
            </Router>
        );
    }}

export default hot(module)(App);