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
	error: {
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

export default function NovaTarefa(props) {

	const classes = useStyles();
    const [id] = useState(props.match.params.id)

    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data_inicio, setDataIni] = useState('')
    const [tempo, setTempo] = useState('')
    const [data_fim, setDataFim] = useState('')
    const [projetos, setProjetos] = useState([])
    const [tipo, setTipo] = useState(null)
    const [status, setStatus] = useState([])
    const [id_projetoAux, setProjetoAux] = useState(null)
    const [projeto, setProjeto] = useState(null)
    const [complexidade, setComplexidade] = useState(null)
    const [complexidadeError, setComplexidadeError] = useState(null)
	const [impacto, setImpacto] = useState(null)
    const [impactoError, setImpactoError] = useState(null)

    const [id_status, setIdStaus] = useState(null)
    const [statusError, setStausError] = useState(null)
    const [tipos, setTipos] = useState(null)
    const [id_tipos, setIdTipos] = useState(null)
    const [tipoError, setTipoError] = useState(null)

    const [id_projeto, setIdProjeto] = useState(null)
    const [projetoError, setProjetoError] = useState(null)
    const [grupo, setGrupo] = useState(null)
    const [grupos, setGrupos] = useState(null)
    const [grupoError, setGrupoError] = useState(null)
    const [prioridade, setPrioridade] = useState(null)
    const [prioridades, setPriroridades] = useState([])
    const [prioridadeError, setPrioridadeError] = useState(false)

    const [tempoError, setTempoError] = useState(false)
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
            var response = await api.get("/projeto");
            setProjetos(response.data.data)
            console.log(projetos);
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {
        try {
            var response = await api.get("/prioridade");
            setPriroridades(response.data.data)
            console.log(prioridades);
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {
        try {
            var response = await api.get("/tarefa_tipo");
            setTipos(response.data.data)
            console.log(projetos);
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {
        try {
            var response = await api.get("tarefa_status")
            setStatus(response.data.data)
            console.log(response.data.data);
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {
        try {
            var response = await api.get("grupo")
            setGrupos(response.data.data)
            console.log(response.data.data);
        } catch (err){
            console.log(err);
        }
	}, [])

    useEffect(async () => {
        try {
            var response = await api.get("/projeto");
            setProjetos(response.data.data)
            if(id_projetoAux){
                // const aux = response.data.data.filter( n => n.id_sistema === id_projetoAux)[0]
                // setSistema(aux)                
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
                    setProjetoAux(aux.id_sistema)
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
        setTempoError(false)
        setPrioridadeError(false)
        
        if(!titulo){
            setTituloError(true)
            setErro("Titulo necessario")
        }
        if(!tempo){
            setTempoError(true)
            setErro("Tempo necessario")
        }
        if(!complexidade){
            setComplexidadeError(true)
            setErro("Complexidade necessario")
        }
        if(!impacto){
            setImpactoError(true)
            setErro("Impacto necessario")
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
        if(!projeto){
            setProjetoError(true)
            setErro("Um projeto é necessario")
        }
        if(!status){
            setStausError(true)
            setErro("Status é necessario")
        }
        if(!tipo){
            setTipoError(true)
            setErro("Tipo é necessario")
        }
        if(!grupo){
            setGrupoError(true)
            setErro("Grupo é necessario")
        }
        if(!prioridade) {
            setPrioridadeError(true)
            setErro("Prioridade é necessaria")
        }

		if(titulo && descricao && data_inicio && data_fim && tempo && complexidade && impacto && id_status && tipo && grupo && projeto && prioridade){
            if(id){
                try {
                    const response = await api.put("/projeto/"+id, {titulo, descricao, data_inicio, data_fim});
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
                    const data = {
                        titulo, descricao, id_projeto: projeto.id,
                        tempo_estimado: tempo, complexidade, impacto, id_status_tarefa: id_status.id,
                        data_inicio, data_fim, id_tipo_tarefa: tipo.id, id_grupo: grupo.id, id_prioridade: prioridade.id
                    }
                    console.log(data);
                    const response = await api.post("/tarefa", data);
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
			<Navbar />
			<Container>
				<div className={classes.bar}>
					<Typography className={classes.title}>
                        {id ? 'Editar tarefa ' :'Nova tarefa'}
					</Typography>
				</div>
				{ error && <p className={classes.error}>{error}</p>}
				{ sucesso && <p className={classes.sucesso}>{sucesso}</p>}
				<form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Container className={classes.container}>
                        <TextField
                            onChange={(e) => setTitulo(e.target.value)}
                            label="Titulo" 
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            required
                            error={tituloError}
                            value={titulo}
                        />
                    </Container>
                    <Container className={classes.container}>
                        <TextField className={classes.fildPequeno}
                            onChange={(e) => setTempo(e.target.value)}
                            label="Tempo estimado" 
                            margin="normal"
                            type="number"
                            variant="outlined" 
                            fullWidth
                            required
                            error={tempoError}
                            value={tempo}
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
                            onChange={(e) => setComplexidade(e.target.value)}
                            label="Complexidade" 
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            type="number"
                            required
                            error={complexidadeError}
                            value={complexidade}
                        />
                        <TextField className={classes.fildPequeno}
                            onChange={(e) => setImpacto(e.target.value)}
                            label="Impacto" 
                            margin="normal"
                            variant="outlined" 
                            fullWidth
                            required
                            type="number"
                            error={impactoError}
                            value={impacto}
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
                       <Autocomplete className={classes.fildPequeno}
                        onChange={(e, values) => setIdStaus(values ? {descricao: values.descricao, id: values.id} : null)}
                        fullWidth
                        options={status}
                        value={id_status}
                        getOptionLabel={(option) => option.descricao}
                        renderInput={(params) => <TextField error={statusError} {...params} label="Status" variant="outlined" />}
                        />
                        <Autocomplete className={classes.fildPequeno}
                            onChange={(e, values) => setTipo(values ? {descricao: values.descricao, id: values.id} : null)}
                            fullWidth
                            options={tipos}
                            value={id_tipos}
                            getOptionLabel={(option) => option.descricao}
                            renderInput={(params) => <TextField error={tipoError} {...params} label="Tipo" variant="outlined" />}
                        />
                    </Container>
                    <Container className={classes.container}>
                        <Autocomplete className={classes.fildPequeno}
                            onChange={(e, values) => setGrupo(values ? {descricao: values.descricao, id: values.id} : null)}
                            fullWidth
                            options={grupos}
                            value={grupo}
                            getOptionLabel={(option) => option.descricao}
                            renderInput={(params) => <TextField error={grupoError} {...params} label="Grupo" variant="outlined" />}
                        />
                        <Autocomplete className={classes.fildPequeno}
                            onChange={(e, values) => setPrioridade(values ? {descricao: values.descricao, id: values.id} : null)}
                            fullWidth
                            options={prioridades}
                            value={prioridade}
                            getOptionLabel={(option) => option.descricao}
                            renderInput={(params) => <TextField error={prioridadeError} {...params} label="Priroridade" variant="outlined" />}
                        />
                    </Container>
                    <Container className={classes.container}>
                        <Autocomplete
                                onChange={(e, values) => setProjeto(values ? {titulo: values.titulo, id: values.id} : null)}
                                fullWidth
                                options={projetos}
                                value={projeto}
                                getOptionLabel={(option) => option.titulo}
                                renderInput={(params) => <TextField error={projetoError} {...params} label="Projeto" variant="outlined" />}
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
