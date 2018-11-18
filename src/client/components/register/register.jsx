import React from 'react';

//import styles from './style.scss';
class Register extends React.Component {
    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password:'',

        };
    }

    render() {

        return(
            <div>
            <h3>User Registration</h3>
            <p>Username</p>
            <input value="Enter Your Username" onChange={(event,value)=>this.setState({username: value})}/><br/>
            <p>Email</p>
            <input value="Enter Your Email" onChange={(event,value)=>this.setState({email: value})}/><br/>
            <p>Password</p>
            <input value="Enter Your Password" onChange={(event,value)=>this.setState({password: value})}/><br/>
            <button Onclick={(event)=>this.props.register}>Login</button>
            </div>

            )
    }

}

export default Register;