import React from 'react';
//import styles from './style.scss'

class Userdashboard extends React.Component {
    constructor(props){
        super(props);
        this.fileSelectHandler = this.fileSelectHandler.bind( this );
        this.fileUploadHandler =  this.fileUploadHandler.bind( this );
        this.changeHandler =  this.changeHandler.bind( this );
        this.state = {
            userSongs: [],
            isLoaded: false,
            isUpload: false,
            error: '',
            selectfile: null,
            userid: null,
            likecount: 0,
            playcount: 0,
            songName:'',
            category:'',
            message:' '
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
            console.log("==DIDM===",response);
            return response.text();
        }).then(function(data){
            let object = JSON.parse(data);
            console.log(object);
            reactThis.setState({userSongs: object})
        }).catch(function(err){
            reactThis.setState({isLoaded: false})
            console.log("Fail",err)
        });
    }

    changeHandler(event){
        let target =  event.target;
        let name = target.name;
        let value =  target.value;

        this.setState({userid:this.props.id, likecount: 0, playcount:0, [name]: value})

    }

    fileSelectHandler(event){
        //console.log('file input', event.target.files[0]);
        this.setState({selectfile: event.target.files[0]})
    }

    fileUploadHandler(event){
        event.preventDefault();

        let data = new FormData()
        //console.log("====", this.state.selectfile)
        data.append('audio', this.state.selectfile, this.state.selectfile.name)
        data.append('userid', this.props.id)
        data.append('likecount', this.state.likecount)
        data.append('playcount', this.state.playcount)
        data.append('category', this.state.category)
        data.append('songName', this.state.songName)
//
        const baseUrl = 'http://localhost:3000/api/profile/user/upload';

        var reactThis = this;

        fetch(baseUrl,{
            method: 'post',
            mode: "cors",
            cache: "no-cache",
            body: data
        }).then(function(response){
            console.log("===FILELOAD==",response);
            return response.json();
        }).then(function(data){
           //let songObject = JSON.parse(data);
           console.log("RESPONSE", data);
           reactThis.setState({ userSongs: [...reactThis.state.userSongs, data], songName:'', category:'', isUpload: true, message: 'Upload Success'})
        }).catch(function(err){
            console.log("Fail", err)
        });

    };

    render() {
                //const songs = this.state.userSongs;
                console.log("halooo");
                const{isLoaded, userSongs, error} = this.state;
                if(error){
                    return <p>{error.message}</p>;
                } else if (isLoaded){
                    return <p>load...my shit</p>;
                }
        return(
            <div>
                <div>
                    <h2>Welcome {this.props.username}</h2>
                    <ul>
                        {userSongs.map((userSongs, index)=>
                            <li key={index}>{userSongs.songname} </li>)}
                    </ul>

                </div>
                <div>
                        <h2>Upload</h2>

                        <form id="myform" onSubmit={this.fileUploadHandler} encType="multipart/form-data">
                            <label>Song Name</label><br/>
                                <input type="text" id="songName" name="songName" value={this.state.songName} onChange={this.changeHandler} /><br/>
                            <label>Category</label><br/>
                                <input type="text" id="category" name="category" value={this.state.category} onChange={this.changeHandler} /><br/>
                            <label>Upload File</label><br/>
                                <input type='file' name='audio' onChange={this.fileSelectHandler} /><br/>
                            <button>submit</button>
                        </form>
                        <p>{this.state.message}</p>}
                </div>
            </div>

            )
    }

}

export default Userdashboard;