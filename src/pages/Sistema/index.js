import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Form } from './styles';
import { login } from "../../services/auth";
import api from "../../services/api";
import TableEx from "../../components/table";
import StickyHeadTable from '../../components/table';
import {
	Container, Typography,
  } from "@material-ui/core";

  const tableData = () => ({
		column:['ID', 'Nome', 'Ações'],
		line:[
		  {'id_sistema': 1, 'nome': 'Leonardo', 'actions': 'crime'},
		  {'id_sistema': 2, 'nome': 'Leonardo', 'actions': 'crime'},
		  {'id_sistema': 3, 'nome': 'Leonardo', 'actions': 'crime'},
		  {'id_sistema': 4, 'nome': 'Leonardo', 'actions': 'crime'},
		  {'id_sistema': 5, 'nome': 'Leonardo', 'actions': 'crime'},
		  {'id_sistema': 6, 'nome': 'Leonardo', 'actions': 'crime'},
		  {'id_sistema': 7, 'nome': 'Leonardo', 'actions': 'crime'},
		]
	})
  

export default function Sistema() {
	const data = tableData()
	return (
		<Container>
			<StickyHeadTable 
				tableData = {data}/>
		</Container>
	);
	
}
