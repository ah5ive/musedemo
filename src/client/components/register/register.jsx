import React from 'react';

//import styles from './style.scss';
class handleChange extends React.Component {
    constructor(){
        super();
        this.handleChange = this.handleChange.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.state = {
            username: '',
            email: '',
            password:'',
            message: '',

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
        console.log("CREATEUSER",this.state)
    }

    render() {

        return(
            <div>
                <h3>User Registration</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label><br/>
                    <input name="username" type="username" id="username" value={this.state.username} onChange={this.handleChange} /><br/>
                    <label>Email</label><br/>
                    <input name="email" type="email" id="email" value={this.state.email} onChange={this.handleChange} /><br/>
                    <label>Password</label><br/>
                    <input name="password" type="password" id="password" value={this.state.password} onChange={this.handleChange} /><br/>
                    <button>Sign Up</button>
                </form>
            </div>

            )
    }

}

export default handleChange;