import React from 'react';
import { BrowserRouter as Router,Route,Link,Redirect } from "react-router-dom";
//import styles from './style.scss';
class Signin extends React.Component {
    constructor(){
        super();

    }

    render() {

        const userPath = "/user/profile/" + this.props.id;

        if (this.props.redirect) {
            return <Redirect to= {userPath}/>
        }

        return(
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.props.handleSignin}>
                    <label>Username</label><br/>
                    <input name="username" type="username" id="username" value={this.props.username} onChange={this.props.handleChange} placeholder="your username" autoComplete="name" required  /><br/>
                    <label>Password</label><br/>
                    <input name="password" type="password" id="password" value={this.props.password} onChange={this.props.handleChange} placeholder="your password" autoComplete="password" required /><br/>
                    <button>Sign In</button>
                </form>
            </div>

            )
    }

}

export default Signin;