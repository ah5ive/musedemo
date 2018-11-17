import React from 'react';
import { hot } from 'react-hot-loader';
import Login from './components/login/login'
// import Product from './components/product/product';
// import Cart from './components/cart/cart';
// import Form from './components/form/form';

class App extends React.Component {
    constructor() {
        super();
        this.state = {

        }   }
    render() {

        return (
            <div>
            <h2>Muse Demo</h2>
            <Login />
            </div>
        );
    }}

export default hot(module)(App);