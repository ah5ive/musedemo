import React from 'react';
import { BrowserRouter as Router,Route,Link, Redirect } from "react-router-dom";
import style from './Signin.scss';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    //marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class Signin extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            signmessage: ''
        }
    }

    render() {

        const { classes } = this.props;
        const userPath = "/user/profile/" + this.props.id;

        if (this.props.signInRedirect) {
            return <Redirect to= {userPath}/>
        }

        return(
            <div>
                <Paper elevation={1} >
                        <main className={classes.main}>
                        <CssBaseline />
                            <Paper className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5"  >
                                Sign In
                                </Typography>
                                <Typography component="h1" variant="h5"  >
                                    {this.state.signmessage}
                                </Typography>
                                <form className={classes.form} onSubmit={this.props.handleSignin}>
                                    <FormControl margin="normal" required fullWidth>
                                        <InputLabel htmlFor="Username">Username</InputLabel>
                                            <Input name="username" type="username" id="username" value={this.props.username} onChange={this.props.handleChange} placeholder="your username" autoComplete="name" autoFocus required  />
                                    </FormControl>
                                    <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                        <Input name="password" type="password" id="password" value={this.props.password} onChange={this.props.handleChange} placeholder="your password" autoComplete="password" autoFocus required /><br/>
                                    </FormControl>
                                    <button className={style.submitbutton}>Sign In</button>
                                </form>
                            </Paper>
                        </main>
                </Paper>
            </div>

            )
    }

}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Signin)