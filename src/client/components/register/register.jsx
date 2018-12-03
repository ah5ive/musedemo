import React from 'react';
import { BrowserRouter as Router,Route,Link,Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import style from './style.scss';

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

class Register extends React.Component {
    constructor(props){
        super(props);

    }

    render() {

        if (this.props.redirect) {
            return <Redirect to='/'/>
        };



        const { classes } = this.props;

        return(
            <div>
                <Paper elevation={1} >
                    <main className={classes.main}>
                        <CssBaseline />
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    User Registration
                                </Typography>
                                    <form className={classes.form}  onSubmit={this.props.handleSubmit}>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="username">Username</InputLabel>
                                                <Input name="username" type="username" id="username" value={this.props.username} onChange={this.props.handleChange} placeholder="your username" autoComplete="name" required  /><br/>
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="email">Email</InputLabel>
                                                <Input name="email" type="email" id="email" value={this.props.email} onChange={this.props.handleChange} placeholder="your email" autoComplete="email" required  /><br/>
                                        </FormControl>
                                        <FormControl margin="normal" required fullWidth>
                                            <InputLabel htmlFor="email">Password</InputLabel>
                                                <Input name="password" type="password" id="password" value={this.props.password} onChange={this.props.handleChange} placeholder="your password" autoComplete="password" required /><br/>
                                        </FormControl>
                                        <button className={style.submitbutton}>Sign Up</button>
                                    </form>
                            </Paper>
                    </main>
                </Paper>
            </div>

            )
    }

}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);