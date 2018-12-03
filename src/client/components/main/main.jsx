import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
//import styles from './style.scss';

const styles = theme =>({
        main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.

    },

        paper: {
            paddingTop:20,
            height: 400,
        }

})

class Main extends React.Component {
    constructor(props){
        super(props);
        this.state = {


        };
    }

    render() {

        const { classes } = this.props;

        return(
            <div>
                <main className={classes.main}>
                    <Paper className={classes.paper} elevation={1} >
                    <Typography align="center" component="h1" variant="h4">
                        Muse Demo
                    </Typography>
                    <Typography align="center" variant="h5">
                        A site for songwriters to upload their demos
                    </Typography>
                    </Paper>
                </main>
            </div>

            )
    }

}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);