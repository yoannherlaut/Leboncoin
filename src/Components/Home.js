import React, { useEffect, useState } from 'react';

//Components Metarials
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

//Style
import { makeStyles } from '@material-ui/core/styles';

//Fetch Data
import { Data } from '../Data';

//Components
import Message from './simpleCompnents/Message';


const useStyles = makeStyles((theme) => ({
  logo: {
    width: '100%',
  },
  message: {
    marginBottom: '10px'
  },
  sendMessage: {
    marginTop: '50px'
  }
}));

const Home = () => {

  const classes = useStyles();

  const [fetchMessages, setFetchMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [privateCheck, setPrivateCheck] = useState(false);
  const [text, setText] = useState(String);
  const [alertMessagePost, setAlertMessagePost] = useState(false);


  useEffect(() => {
    if (Data) {
      setLoadingMessages(false)
      setFetchMessages(Data)
    }
  }, []);


  const sendText = () => {
    if (text) {
      let message = {
        id: fetchMessages.length + 1,
        private: privateCheck,
        body: text
      }
      setFetchMessages([...fetchMessages, message])
      setText('')
      setPrivateCheck(false)
      setAlertMessagePost(true)
    }
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">

        <Grid container justifyContent='center'>

          {/* Header */}
          <Grid item xs={6}>
            <img className={classes.logo} alt='logo' src="logo.png"></img>
          </Grid>

          <Grid container justifyContent="center" alignItems="center">

            {/* List of messages with a Lock icon for private message */}
            {
              !loadingMessages && fetchMessages ?
                fetchMessages.map((message) => {
                  return (
                    <Message style={classes.message} key={message.id} data={message} />
                  );
                })
                : <Grid container justifyContent='center'>
                  <CircularProgress />
                </Grid>
            }

            {/* Send your message with the checkbox for switch public to private message */}
            <Grid className={classes.sendMessage} container alignItems='center'>
              <Grid item xs={11} md={8}>
                <TextField multiline fullWidth required label="Texte" variant="outlined" value={text} onChange={(e) => setText(e.target.value)} />
              </Grid>
              <Grid item xs={6} md={2}>
                <Grid container justifyContent='center'>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={privateCheck}
                        onChange={() => setPrivateCheck(!privateCheck)}
                        color="secondary"
                      />
                    }
                    label={privateCheck ? "Privé" : "Public"}
                  />
                </Grid>
              </Grid>
              <Grid item xs={6} md={1}>
                <Button variant="contained" color="primary" onClick={() => sendText()}>
                  Envoyer
                </Button>
              </Grid>
            </Grid>

            {/* Alert to say that the message has been sent correctly */}
            <Snackbar open={alertMessagePost} autoHideDuration={3000} onClose={() => setAlertMessagePost(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
              <Alert onClose={() => setAlertMessagePost(false)} severity="success">
                Message envoyé !
              </Alert>
            </Snackbar>

          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default Home