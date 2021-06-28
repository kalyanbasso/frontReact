import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from "../../services/api";
import { useHistory } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Pe De Abacate
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error2: {
    color: '#f44336'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setconfirmPass] = useState('')
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [confirmPassError, setConfirmPassError] = useState(false)
  const [error, setErro] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameError(false)
    setPasswordError(false)
    setConfirmPassError(false)
    setErro(false)

    if (password == '') {
      setPasswordError(true)
      setErro("Senha necessária")
    }
    if (confirmPass == '') {
      setConfirmPassError(true)
      setErro("Comfirme a senha")
    }
    if (username == '') {
      setUsernameError(true)
      setErro("Usuario necessário")
    }

		if (username && password && confirmPass){
      if(password === confirmPass){
        try {
          const response = await api.post("/usuario", {username});
          if(response.status === 200){
            history.push('/')
          }
        } catch (err){
          console.log(err);
          setErro("Erro ao crira usuario")
        }
      } else {
        setPasswordError(true)
        setConfirmPassError(true)
        setErro("Senhas diferentes")
      }
		}
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrar
        </Typography>
        { error && <p className={classes.error2}>{error}</p>}
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField className={classes.field}
            onChange={(e) => setUsername(e.target.value)}
            label="Usuario" 
            margin="normal"
            variant="outlined" 
            fullWidth
            required
            error={usernameError}
          />
          <TextField className={classes.field}
            onChange={(e) => setPassword(e.target.value)}
            label="Senha"
			margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            error={passwordError}
          />
		  <TextField className={classes.field}
            onChange={(e) => setconfirmPass(e.target.value)}
            label="Confirmar Senha"
			margin="normal"
            variant="outlined"
            type="password"
            fullWidth
            required
            error={confirmPassError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}