import React, { useEffect, useState } from "react";
import api from "../../services/api";
import StickyHeadTable from '../../components/table';
import Navbar from "../../components/navbar/NavBar";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from "@material-ui/core";
  
const useStyles = makeStyles((theme) => ({
	title: {
	  marginTop: theme.spacing(8),
	  display: 'flex',
	  flexDirection: 'column',
	  alignItems: 'center',
	},
}));

export default function Sistema() {
	const [sistemas, setSistemas] = useState([])
	const classes = useStyles();

	useEffect(async () => {
		try {
			const response = await api.get("/sistema");
			setSistemas(response.data.data)
		} catch (err){
			console.log(err);
		}
	}, [])

	const data = {
		column:['ID', 'Nome', 'Ações'],
		bind:['id_sistema', 'nome', 'acao'],
		line: sistemas
	}

	return (
		<>
			<Navbar />
			<Container>
				<Typography className={classes.title}>
					Sistemas
				</Typography>
				<StickyHeadTable tableData = {data}/>
			</Container>
		</>
	);
	
}
