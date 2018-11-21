import React from 'react';

//import styles from './style.scss';

class Userdashboard extends React.Component {
    constructor(props){
        super(props);
        this.fileSelectHandler = this.fileSelectHandler.bind( this );
        this.state = {
            userSongs: [],
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
            //console.log("=====",response);
            return response.text();
        }).then(function(data){
            let object = JSON.parse(data);
            reactThis.setState({userSongs: object})
        }).catch(function(err){
            reactThis.setState({isLoaded: false})
            console.log("Fail",err)
        });
    }

    fileSelectHandler(event){
        console.log('file input', event);
    }

    render() {
                const songs = this.state.userSongs;
                console.log("SONGS", songs);
                //const{isLoaded, userSongs, error} = this.state;
                if(this.state.error){
                    return <p>{this.state.error.message}</p>;
                } else if (this.state.isLoaded){
                    return <p>load...my shit</p>;
                }
        return(
            <div>
                <ul>
                    {this.state.userSongs.map((userSongs, index)=>
                        <li key={index}>{userSongs.songname}
                            <audio controls>
                                <source src={userSongs.song_url}/>
                            </audio>
                                </li>)}
                </ul>

                <div>
                    <h2>Upload</h2>
                    <input type="file" name="audio" onChange={this.fileSelectHandler}/>
                </div>

            </div>
            )
    }

}

export default Userdashboard;