import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const Dashboard = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.image} >
                <h1>Dashboard</h1>
            </div>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100vw',
    },
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
  
export default Dashboard;