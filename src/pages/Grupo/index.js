import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
import Button from '@material-ui/core/Button';
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

const sortArray = (data) => {
	return data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
}

export default function Sistema() {
	const [grupo, setGrupos] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/grupo");
			setGrupos(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Projeto', 'Descrição', 'Ações'],
		bind:['id', 'projeto', 'descricao', 'acao'],
		line: sortArray(grupo),
		acoes:[
			{
				title: 'Editar',
				path: '/novo-grupo',
				icon: <EditIcon />
			},
			{
				title: 'Excluir',
				icon: <DeleteIcon />,
				function: 'deletar',
				path: '/grupo',
				errormsg: 'Não foi possivel deletar!',
				sucessomsg: 'Grupo deletado com sucesso'
		},],
	}

	return (
		<>
			<Navbar />
			<Container>
        <div className={classes.bar}>
          <Typography className={classes.title}>
            Grupo
          </Typography>
          <Button
			component={Link}
			to="/novo-grupo"
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
