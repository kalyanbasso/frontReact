import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Form, Container } from './styles';

import api from "../../services/api";

class Registrar extends Component {
	state = {
		username: "",
		password: "",
		error: ""
	};
	
	handleRegistrar = async e => {
		e.preventDefault();
		const { username, password } = this.state;
		console.log(username);
		console.log(password);
		if (!username || !password){
			this.setState({
				error: "Falta username ou password"
			});
		} else {
			try {
				await api.post("/users", {username, password});
				this.props.history.push("/");
			} catch (err){
				console.log(err);
				this.setState({
					error: "Ocorreu algum erro :) boa sorte!"
				});
			}
		}
		//console.log("registrando");
	};
	
	render(){
		return (
			<Container>
				<Form onSubmit={this.handleRegistrar}>
					{ this.state.error && <p>{this.state.error}</p>}
					<p>Usuário
					<input type="text"
					onChange={e => this.setState({username: e.target.value})}/>
					</p>
					<p>Senha
					<input type="password"
					onChange={e => this.setState({password: e.target.value})}/>
					</p>
					<button type="submit">Cadastrar</button>
					<Link to="/">Fazer login</Link>
				</Form>
			</Container>
		);
	}
}
export default withRouter(Registrar);
