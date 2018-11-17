import React from 'react';

//import styles from './style.scss';
class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            email: '',

        };
    }

    render() {

        return(
            <div>
            <h3>Sign in</h3>
            <p>Username</p>
            <input onChange={(event,value)=>this.setState({username: value})}/><br/>
            <p>Password</p>
            <input onChange={(event,value)=>this.setState({password: value})}/><br/>
            </div>

            )
    }

}

export default Login;