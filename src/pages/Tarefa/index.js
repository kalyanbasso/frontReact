import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
  
const useStyles = makeStyles((theme) => ({
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
  }
}));

function novoProjeto() {
    console.log("object");
}

const sortArray = (data) => {
	return data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
}

export default function Sistema() {
	const [tarefa, setTarefa] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/tarefa");
			setTarefa(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Titulo', 'Descrição', 'Projeto', 'Criador', 'Dev', 'Tempo Estimado', 'Tempo Realizado', 'Inicio', 'Fim', 'Prioridade', 'Complexidade', 'Ações' ],
		bind:['id', 'titulo', 'descricao','id_projeto', 'id_criador', 'id_dev','tempo_estimado', 'tempo_realizado', 'data_inicio','data_fim', 'id_prioridade','complexidade', 'acoes',],
		line: sortArray(tarefa)
	}

	return (
		<>
			<Navbar />
			<Container>
        <div className={classes.bar}>
          <Typography className={classes.title}>
            Tarefa
          </Typography>
          <Button
            onClick={novoProjeto}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Novo
          </Button>
        </div>
				<StickyHeadTable tableData = {data}/>
			</Container>
		</>
	);
	
}
