import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Sidebar from "../../components/Sidebar/Sidebar";

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
	},
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '2%'
    },
    fildPequeno: {
        width: '45%'
    },

}));

export default function NovoProjeto(props) {

	const classes = useStyles();
    const [id] = useState(props.match.params.id)

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data_inicio, setDataIni] = useState('')
    const [data_fim, setDataFim] = useState('')
    const [sistemas, setSistemas] = useState([])
	const [id_sistema, setSistema] = useState(null)
    const [id_sistemaAux, setSistemaAux] = useState(null)
    const [projeto, setProjeto] = useState(null)
	
    const [tituloError, setTituloError] = useState(false)
    const [descricaoError, setDescricaoError] = useState(false)
    const [dataFimError, setDataFimError] = useState(false)
    const [dataIniError, setDataIniError] = useState(false)
    const [sistemaError, setSistemaError] = useState(false)
	const [error, setErro] = useState(false)
	const [sucesso, setSucesso] = useState(false)
    const [atualizar, setAtualizar] = useState(false)

    useEffect(async () => {
        try {
            const response = await api.get("/sistema");
            setSistemas(response.data.data)
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {
        try {
            const response = await api.get("/sistema");
            setSistemas(response.data.data)
            if(id_sistemaAux){
                const aux = response.data.data.filter( n => n.id_sistema === id_sistemaAux)[0]
                setSistema(aux)                
            }
        } catch (err){
            console.log(err);
        }
	}, [atualizar])

	useEffect(async () => {
		if(id){
			try {
				const response = await api.get("/projeto/" + id);
				if(response.data.data.length !== 0) {
                    const aux = response.data.data[0]
					setProjeto(aux)
                    setTitulo(aux.titulo)
                    setDescricao(aux.descricao)
                    setDataIni(aux.dt_ini)
                    setDataFim(aux.dt_fim)
                    setSistemaAux(aux.id_sistema)
                    setAtualizar(true)
				}
			} catch (err){
				console.log(err);
			}
		}		
	}, [id])

    

	const handleSubmit = async (e) => {
		e.preventDefault()
		setErro(false)
		setSucesso(false)
        setTituloError(false)
        setDescricaoError(false)
        setDataIniError(false)
        setDataFimError(false)
        setSistemaError(false)
        
        if(!titulo){
            setTituloError(true)
            setErro("Titulo necessario")
        }
        if(!descricao){
            setDescricaoError(true)
            setErro("Descrição necessaria")
        }
        if(!data_inicio) {
            setDataIniError(true)
            setErro("Data inicio necessaria")
        }
        if(!data_fim){
            setDataFimError(true)
            setErro("Data fim necessaria")
        }
        if(!id_sistema){
            setSistemaError(true)
            setErro("Um sistema é necessario")
        }

		if(titulo && descricao && data_inicio && data_fim && id_sistema){
            if(id){
                try {
                    const response = await api.put("/projeto/"+id, {titulo, descricao, data_inicio, data_fim, id_sistema: id_sistema.id_sistema});
                    if(response.status === 200){
                        setSucesso(response.data)
                    }
                    setErro(false)
                } catch (err){
                    console.log(err);
                    setErro("Algo deu errado!")
                }
            }else{
                try {

                    const response = await api.post("/projeto", {titulo, descricao, data_inicio, data_fim, id_sistema: id_sistema.id_sistema});
                    if(response.status === 200){
                        setSucesso(response.data)
                    }
                } catch (err){
                    console.log(err);
                    setErro("Algo deu errado!")
                }
            }
        }
        
	}

	return (
		<>
			<Sidebar />
			<Container>
				<div className={classes.bar}>
					<Typography className={classes.title}>
                        {id ? 'Editar projeto ' +  (projeto ? `(${projeto.titulo})` : '') :'Novo projeto'}
					</Typography>
				</div>
				{ error && <p className={classes.error2}>{error}</p>}
				{ sucesso && <p className={classes.sucesso}>{sucesso}</p>}
				<form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Container className={classes.container}>
                        <TextField className={classes.fildPequeno}
                            onChange={(e) => setTitulo(e.target.value)}
                            label="Titulo" 
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            required
                            error={tituloError}
                            value={titulo}
                        />
                        <TextField className={classes.fildPequeno}
                            onChange={(e) => setDescricao(e.target.value)}
                            label="Descricao" 
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            required
                            error={descricaoError}
                            value={descricao}
                        />
                    </Container>
					<Container className={classes.container}>
                        <TextField className={classes.fildPequeno}
                            onChange={(e) => setDataIni(e.target.value)}
                            label="Data inicio"
                            type="date"
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            value={data_inicio}
                            error={dataIniError}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField className={classes.fildPequeno}
                            onChange={(e) => setDataFim(e.target.value)}
                            label="Data fim"
                            type="date"
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            value={data_fim}
                            error={dataFimError}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Container>
                    <Container className={classes.container}>
                        <Autocomplete
                            onChange={(e, values) => setSistema(values ? {nome: values.nome, id_sistema: values.id_sistema} : null)}
                            fullWidth
                            options={sistemas}
                            value={id_sistema}
                            getOptionLabel={(option) => option.nome}
                            renderInput={(params) => <TextField error={sistemaError} {...params} label="Sistema" variant="outlined" />}
                        />
                    </Container>
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
