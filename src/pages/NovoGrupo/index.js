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
import Autocomplete from '@material-ui/lab/Autocomplete';

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
	error2: {
		color: '#f44336',
		textAlign: 'center'
	},
	sucesso: {
		color: '#08aa1e',
		textAlign: 'center'
	}

}));

export default function NovoGrupo(props) {

	const classes = useStyles();
	const [descricao, setNome] = useState('')
	const [sistema, setSistema] = useState(null)
	const [id] = useState(props.match.params.id)
	const [nomeError, setNomeError] = useState(false)
    const [projetos, setProjetos] = useState([])
	const [error, setErro] = useState(false)
	const [sucesso, setSucesso] = useState(false)
    const [id_projeto, setProjeto] = useState(null)
    const [projetoError, setProjetoError] = useState(false)
    const [idAux, setIdAux] = useState(null)
    const [atualizar, setAtualizar] = useState(false)

    useEffect(async () => {
        try {
            const response = await api.get("/projeto");
            setProjetos(response.data.data)
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {

        try {
            const response = await api.get("/projeto");
            setProjetos(response.data.data)
            if(idAux){
                const aux = response.data.data.filter( n => n.id === idAux)[0]
                setProjeto(aux)            
            }
        } catch (err){
            console.log(err);
        }
	}, [atualizar])

	useEffect(async () => {
		if(id){
			try {
				const response = await api.get("/grupo/" + id);
				if(response.data.data.length !== 0) {
					setNome(response.data.data[0].descricao)
					setProjeto(response.data.data[0])
                    setIdAux(response.data.data[0].id_projeto)
                    setAtualizar(true)
				}
			} catch (err){
				console.log(err);
			}
		}		
	}, [id])

	const handleSubmit = async (e) => {
		e.preventDefault()
		setNomeError(false)
        setProjetoError(false)
		setErro(false)
		setSucesso(false)

		if (descricao === '') {
		  setNomeError(true)
		  setErro("Descricao necessária")
		}
        if(!id_projeto || id_projeto === null) {
            setProjetoError(true)
            setErro("Projeto necessário")
        }
		if (descricao && id_projeto){
			if(id){
				try {
					const response = await api.put("/grupo/"+id, {descricao, id_projeto: id_projeto.id});
					if(response.status === 200){
						setErro(false)
                        setProjetoError(false)
						setSucesso(response.data)
					}
					setErro(false)
                    setProjetoError(false)
				} catch (err){
					console.log(err);
					setErro("Algo deu errado!")
				}
			}else{
				try {
					const response = await api.post("/grupo",  {descricao, id_projeto: id_projeto.id});
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
	}

	return (
		<>
			<Navbar />
			<Container>
				<div className={classes.bar}>
					<Typography className={classes.title}>
						{id ? 'Editar Grupo ' +  (sistema ? `(${sistema.descricao})` : '') :'Novo grupo'}
					</Typography>
				</div>
				{ error && <p className={classes.error2}>{error}</p>}
				{ sucesso && <p className={classes.sucesso}>{sucesso}</p>}
				<form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
					<TextField className={classes.field}
						onChange={(e) => setNome(e.target.value)}
						label="Descricao" 
						margin="normal"
						variant="outlined" 
						fullWidth
						required
						error={nomeError}
						value={descricao}
					/>
                    <Autocomplete
                        onChange={(e, values) => setProjeto(values ? {titulo: values.titulo, id: values.id} : null)}
                        fullWidth
                        options={projetos}
                        value={id_projeto}
                        getOptionLabel={(option) => option.titulo}
                        renderInput={(params) => <TextField error={projetoError} {...params} label="Projeto" variant="outlined" />}
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
