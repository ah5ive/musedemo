import React from 'react';
import { BrowserRouter as Router,Route,Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import style from './user.scss'

const styles = theme =>({
        main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.

    },

        paper: {
            paddingTop:20,
            paddingLeft:20,
            PaddingRight:20,
            height: 400,
        },

        form:{
            padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`
        },

})

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
                const { classes } = this.props;
                //console.log("halooo");
                if (!this.props.signInDashboard){
                    return <Redirect to="/signin" />
                };

                const{isLoaded, userSongs, error} = this.state;
                if(error){
                    return <p>{error.message}</p>;
                } else if (isLoaded){
                    return <p>loading....</p>;
                }
        return(
            <div>
                <Paper className={classes.paper} elevation={1}>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <h2>Welcome {this.props.username}</h2>
                        <ul>
                            {userSongs.map((userSongs, index)=>
                                <li key={index}>{userSongs.songname}<br/>
                                    <audio controls>
                                        <source src={userSongs.song_url} type="audio/mp3" />
                                    </audio>
                                </li>)}
                        </ul>

                    </Grid>
                   <Grid item xs={6}>
                        <form className={classes.form} id="myform" onSubmit={this.fileUploadHandler} encType="multipart/form-data">
                            <h2>Upload</h2>
                            <p>{this.state.message}</p>
                                <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="Song Name">Song Name</InputLabel>
                                    <Input type="text" id="songName" name="songName" value={this.state.songName} onChange={this.changeHandler} /><br/>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                 <InputLabel htmlFor="Category">Category</InputLabel>
                                    <Input type="text" id="category" name="category" value={this.state.category} onChange={this.changeHandler} /><br/>
                                </FormControl>
                                    <input type='file' name='audio' onChange={this.fileSelectHandler} />

                            <button>submit</button>
                        </form>

                    </Grid>
                </Grid>
                </Paper>
            </div>

            )
    }

}

Userdashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Userdashboard);