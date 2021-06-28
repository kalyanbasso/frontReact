import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/Navbars/AdminNavbar"
  
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
	const [tarefaStatus, setTarefaStatus] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/tarefa_status");
			setTarefaStatus(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Descrição','Ações'],
		bind:['id', 'descricao', 'acao'],
		line: sortArray(tarefaStatus),
		acoes:[
			{
				title: 'Editar',
				path: '/novo-status',
				icon: <EditIcon />
			},
			{
				title: 'Excluir',
				icon: <DeleteIcon />,
				function: 'deletar',
				path: '/tarefa_status',
				errormsg: 'Não foi possivel deletar',
				sucessomsg: 'Status deletado com sucesso'
		},],
	}

	return (
		<>
			<Sidebar />
			<AdminNavbar brandText="Tarefa Status"/>
			<Container>
				<div className={classes.bar}>
					<Button
						component={Link}
						to="/novo-status"
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
