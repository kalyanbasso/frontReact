import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import api from "../../services/api";
import { login, getToken } from "../../services/auth";
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
  error: {
    color: '#f44336'
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [error, setErro] = useState(false)
  

  useEffect(() => {
    const token = getToken()
    if(token){
      history.push('/app')
    }      
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setUsernameError(false)
    setPasswordError(false)
    setErro(false)

    if (username === '') {
      setUsernameError(true)
      setErro("Usuario necessário")
    }
    if (password === '') {
      setPasswordError(true)
      setErro("Senha necessária")
    }
		if (username && password){
      try {
				const response = await api.post("/login", {username, password});
				login(response.data.token, remember);
        history.push('/app')
			} catch (err){
				console.log(err);
        setErro("Usuario ou senha inválido")
        setUsernameError(true)
        setPasswordError(true)
			}
		}
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        { error && <p className={classes.error}>{error}</p>}
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
            variant="outlined"
            type="password"
            fullWidth
            required
            error={passwordError}
          />
          <FormControlLabel
            control={<Checkbox onChange={(e) => setRemember(e.target.checked)} value="remember" color="primary" />}
            label="Lembrar"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/registrar" variant="body2">
                {"Não possui conta? Registre-se"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}