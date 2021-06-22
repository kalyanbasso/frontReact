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
		bind:['id', 'titulo', 'descricao', 'id_criador', 'id_sistema', 'acoes'],
		line: sortArray(projetos)
	}

	return (
		<>
			<Navbar />
			<Container>
        <div className={classes.bar}>
          <Typography className={classes.title}>
            Projeto
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
