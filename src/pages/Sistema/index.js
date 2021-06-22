import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
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
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
}));


export default function Sistema() {
	const [sistemas, setSistemas] = useState([])
	const classes = useStyles();
  	const history = useHistory();

	useEffect(async () => {
		try {
			const response = await api.get("/sistema");
			setSistemas(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const sortArray = (data) => {
		return data.sort((a,b) => (a.id_sistema > b.id_sistema) ? 1 : ((b.id_sistema > a.id_sistema) ? -1 : 0))
	}

	const data = {
		column:['ID', 'Nome', 'Ações'],
		bind:['id_sistema', 'nome', 'acao'],
		line: sortArray(sistemas),
		acoes:[
			{
				title: 'Editar',
				path: '/novo-sistema',
				icon: <EditIcon />
			},
			{
				title: 'Excluir',
				icon: <DeleteIcon />,
				function: 'deletar',
				path: '/sistema',
				errormsg: 'Não foi possivel deletar: projetos vinculados!',
				sucessomsg: 'Sistema deletado com sucesso'
			},],
	}
	
	return (
		<>
			<Navbar />
			<Container>
       			<div className={classes.bar}>
					<Typography className={classes.title}>
						Sistemas
					</Typography>
					<Button
						component={Link}
						to="/novo-sistema"
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
