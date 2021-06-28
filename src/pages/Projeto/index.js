import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import AdminNavbar from "../../components/Navbars/AdminNavbar"

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
  
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

const sortArray = (data) => {
	return data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
}

export default function Sistema() {
	const [projetos, setProjetos] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/projeto");
			setProjetos(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Titulo', 'Descricao', 'Criador', 'Sistema', 'Ações'],
		bind:['id', 'titulo', 'descricao', 'criador', 'sistema', 'acao'],
		line: sortArray(projetos),
		acoes:[
			{
				title: 'Editar',
				path: '/novo-projeto',
				icon: <EditIcon />
			},
			{
				title: 'Excluir',
				icon: <DeleteIcon />,
				function: 'deletar',
				path: '/projeto',
				errormsg: 'Não foi possivel deletar: tarefas vinculadas!',
				sucessomsg: 'Projeto deletado com sucesso'
		},],
	}

	return (
		<>
			<Sidebar />
			<AdminNavbar brandText="Projetos"/>
			<Container>
			<div className={classes.bar}>
				<Button
					component={Link}
					to="/novo-projeto"
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
