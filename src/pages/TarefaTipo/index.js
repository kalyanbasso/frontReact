import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/Navbars/AdminNavbar"
import { Link } from "react-router-dom";
  
const useStyles = makeStyles((theme) => ({
	title: {
	  alignItems: 'center',
    fontSize: '2em'
	},
  bar: {
    marginTop: theme.spacing(8),
	  marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row-reverse',
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
	const [tarefaTipo, setTarefaTipo] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/tarefa_tipo");
			setTarefaTipo(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Descrição', 'Ações'],
		bind:['id', 'descricao', 'acao'],
		line: sortArray(tarefaTipo),
		acoes:[
			{
				title: 'Editar',
				path: '/novo-tipo',
				icon: <EditIcon />
			},
			{
				title: 'Excluir',
				icon: <DeleteIcon />,
				function: 'deletar',
				path: '/tarefa_tipo',
				errormsg: 'Não foi possivel deletar!',
				sucessomsg: 'Tipo deletado com sucesso'
		},],
	}

	return (
		<>
			<Sidebar />
			<AdminNavbar brandText="Sistemas"/>
			<Container>
				<div className={classes.bar}>
					<Button
						component={Link}
						to="/novo-tipo"
						variant="contained"
						color="primary"
						className={classes.submit}> 
						Novo
					</Button>
				</div>
				<StickyHeadTable tableData = {data}/>
			</Container>
		</>
	);
	
}
