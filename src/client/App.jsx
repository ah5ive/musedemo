import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Switch, PrivateRoute } from "react-router-dom";
import { hot } from 'react-hot-loader';
import Register from './components/register/register';
import Signin from './components/signin/signin';
import Userdashboard from './components/user/userdashboard';
import Main from './components/main/main';

class App extends React.Component {

        constructor(props){
        super(props);
        const { cookies } = props;
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleSignin = this.handleSignin.bind( this );
        this.state = {
            username: '',
            email: '',
            password:'',
            message: '',
            //newuser: [],
            redirect: false,
            signInRedirect: false,
            userId: null,

        };
    }

    handleChange(event){
        let target =  event.target;
        let name = target.name;
        let value =  target.value;

        this.setState({[name]: value});


    }

    handleSubmit(event){
        event.preventDefault();
        var reactThis = this;
        const newuser = {username: this.state.username,
                         email: this.state.email,
                         password: this.state.password};
        //console.log("CREATEUSER",this.state);
        fetch('http://localhost:3000/api/register',{
            method: 'post',
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(newuser),
            headers:{
            'Content-Type': 'application/json'
            }
        }).then(function(response){
            //console.log("=====",response);
            console.log("Success",JSON.stringify(newuser));
            // after user saves
            reactThis.setState({redirect: true});
            // console.log("STATE:", this.state);
            // window.location = '/';
        }).catch(function(err){
            console.log("Fail",err)
        });

    }

    handleSignin(event){
        event.preventDefault();
        var reactThis = this;
        const userSignin = {username: this.state.username,
                            password: this.state.password};
        //console.log("Sign In",this.state);
        fetch('http://localhost:3000/api/signin',{
            method: 'post',
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(userSignin),
            headers:{
            'Content-Type': 'application/json'
                }
        }).then(function(response){
            return response.json()
        }).then(function(myresponse){
            //get data from response then setState
            reactThis.setState({signInRedirect: true, username: myresponse.username, id: myresponse.user_id});
        }).catch(function(err){
            console.log("Fail",err)
        });

    }

    render() {

        const userPath = "/user/profile/" + this.state.id;

        return (
            <div>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                            <li>
                                <NavLink to="/signin">Sign in</NavLink>
                            </li>
                            <li>
                                <NavLink to={userPath}>Dash Board</NavLink>
                            </li>
                            <li>
                                <NavLink to="/">Home</NavLink>
                            </li>

                        </ul>

                    </nav>
                </div>
                <Switch>
                <div>
                        <Route path="/user/profile/:id" render={() => <Userdashboard
                                                                        id={this.state.id}
                                                                        username={this.state.username}/>} />
                        <Route exact path="/signin"
                            render={() => <Signin   handleChange={this.handleChange}
                                                    handleSignin={this.handleSignin}
                                                    username={this.state.username}
                                                    password={this.state.password}
                                                    signInRedirect={this.state.signInRedirect}
                                                    id={this.state.id}             />}/>

                        <Route exact path="/register"
                            render={() => <Register handleChange={this.handleChange}
                                                    handleSubmit={this.handleSubmit}
                                                    username={this.state.username}
                                                    email={this.state.email}
                                                    password={this.state.password}
                                                    redirect={this.state.redirect} />}/>

                        <Route exact path="/" component={Main} />

                </div>
            </Switch>
            </div>
        );
    }}

export default hot(module)(App);