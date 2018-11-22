import React from 'react';

//import styles from './style.scss'

class Userdashboard extends React.Component {
    constructor(props){
        super(props);
        // this.fileSelectHandler = this.fileSelectHandler.bind( this );
        // this.fileUploadHandle =  this.fileUploadHandle.bind( this );
        this.state = {
            userSongs: [],
            isLoaded: false,
            error: null,
            selectfile: null,
            userid: null,


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

    // fileSelectHandler(event){
    //     console.log('file input', event.target.files[0]);
    //     this.setState({selectfile: event.target.files[0]})
    // }

    // fileUploadHandle(event){
    //     const baseUrl = 'http://localhost:3000/api/profile/user/upload';
    //     const songUpload = {
    //         song: this.state.selectfile,
    //         userid: this.props.id
    //     }

    //     fetch(baseUrl ,{
    //         method: 'post',
    //         mode: "cors",
    //         cache: "no-cache",
    //         body: JSON.stringify(songUpload),
    //         headers:{
    //         'Content-Type': 'application/json'
    //             }
    //     }).then(function(response){
    //         console.log("=====",response);
    //         //return response.text();
    //     }).then(function(data){
    //         //let object = JSON.parse(data);
    //     }).catch(function(err){
    //         console.log("Fail",err)
    //     });
    // }

    render() {
                //const songs = this.state.userSongs;
                //console.log("SONGS", songs);
                const{isLoaded, userSongs, error} = this.state;
                if(error){
                    return <p>{error.message}</p>;
                } else if (isLoaded){
                    return <p>load...my shit</p>;
                }
        return(
            <div>
                <div>
                    <ul>
                        {userSongs.map((userSongs, index)=>
                            <li key={index}>{userSongs.songname} </li>)}
                    </ul>

                </div>
                <div>
                        <h2>Upload</h2>

                        <form id="myform" action='/api/profile/user/upload' method="post" encType="multipart/form-data">
                            <label>Song Name</label>
                                <input type="text" name="name"/><br/>
                            <label>Upload File</label>
                                <input type='file' name='audio' /><br/>
                                <input type='hidden' name="name" value={this.props.id}/>
                            <label>Category</label>
                                <input type="text" name="name"/>
                                <input type='hidden' name='name' value="0"/>
                                <input type='hidden' name='name' value="0"/>
                            <button>submit</button>
                        </form>
                </div>
            </div>

            )
    }

}

export default Userdashboard;