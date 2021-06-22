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
	return data.sort((a,b) => (a.id_usuario > b.id_usuario) ? 1 : ((b.id_usuario > a.id_usuario) ? -1 : 0))
}

export default function Sistema() {
	const [comentarios, setComentarios] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/comentario");
			setComentarios(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Tarefa', 'Descrição', 'Tarefa Pai', 'Ações'],
		bind:['id_usuario', 'id_tarefa', 'descricao', 'id_pai_comentario', 'acao'],
		line: sortArray(comentarios)
	}
	
	return (
		<>
			<Navbar />
			<Container>
        <div className={classes.bar}>
          <Typography className={classes.title}>
            Comentarios
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