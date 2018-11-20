import React from 'react';

//import styles from './style.scss';

class Userdashboard extends React.Component {
    constructor(props){
        super(props);
        this.getUser = this.getUser.bind( this );
        this.state = {
            userSongs: null,
            isLoaded: false,
            error: null,


        };

    }

    componentDidMount() {
        const getUser = {userid: this.props.id}
        var reactThis = this;
        var baseUrl ='http://localhost:3000/api/profile/user/' + this.props.id;
        fetch(baseUrl,{
            method: 'post',
            mode: "cors",
            cache: "no-cache",
            body: JSON.stringify(getUser),
            headers:{
            'Content-Type': 'application/json'
                }
        }).then(function(response){
            console.log("=====",response);
            return response.json()
        }).then(function(data){
            console.log("DATA", data);
            reactThis.setState({userSongs: data})
        }).catch(function(err){
            console.log("Fail",err)
        });
    }

    getUser(event){
        console.log('click is triggeringgggg');

        event.preventDefault();
        // const getUser = {userid: this.props.id}
        // var reactThis = this;
        // var baseUrl ='http://localhost:3000/api/profile/user/' + this.props.id;
        // fetch(baseUrl,{
        //     method: 'post',
        //     mode: "cors",
        //     cache: "no-cache",
        //     body: JSON.stringify(getUser),
        //     headers:{
        //     'Content-Type': 'application/json'
        //         }
        // }).then(function(response){
        //     console.log("=====",response);
        //     return response.json()
        // }).then(function(data){
        //     console.log("DATA", data);
        //     reactThis.setState({userSongs: data})
        // }).catch(function(err){
        //     console.log("Fail",err)
        // });
    }

    render() {
        console.log("SONGS", this.state.userSongs);



        return(
        <div>
            <h2>{this.props.username}</h2>
        </div>
      )
    }
}

export default Userdashboard;