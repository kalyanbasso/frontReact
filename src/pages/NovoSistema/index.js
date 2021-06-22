import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	submit: {
	  margin: theme.spacing(3, 0, 2),
	},
	title: {
		alignItems: 'center',
		fontSize: '2em'
	},
	bar: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(4),
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	error: {
		color: '#f44336',
		textAlign: 'center'
	},
	sucesso: {
		color: '#08aa1e',
		textAlign: 'center'
	}

}));

export default function NovoSistema() {

	const classes = useStyles();
	const history = useHistory();
	const [nome, setNome] = useState('')
	const [nomeError, setNomeError] = useState(false)
	const [error, setErro] = useState(false)
	const [sucesso, setSucesso] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setNomeError(false)
		setErro(false)
		setSucesso(false)

		if (nome === '') {
		  setNomeError(true)
		  setErro("Nome necessário")
		}
		if (nome){
		  	try {
				const response = await api.post("/sistema", {nome});
				if(response.status === 200){
					setErro(false)
					setSucesso(response.data)
				}
				setErro(false)
			} catch (err){
				console.log(err);
				setErro("Algo deu errado!")
			}
		}
	}

	return (
		<>
			<Navbar />
			<Container>
				<div className={classes.bar}>
					<Typography className={classes.title}>
						Novo sistema
					</Typography>
				</div>
				{ error && <p className={classes.error}>{error}</p>}
				{ sucesso && <p className={classes.sucesso}>{sucesso}</p>}
				<form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField className={classes.field}
						onChange={(e) => setNome(e.target.value)}
						label="Nome" 
						margin="normal"
						variant="outlined" 
						fullWidth
						required
						error={nomeError}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>Salvar</Button>
				</form>
			</Container>
		</>
	);
	
}
