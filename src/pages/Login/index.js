import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Form, Container } from './styles';
import { login } from "../../services/auth";
import api from "../../services/api";

class Login extends Component {
	state = {
		username: "",
		password: "",
		error: ""
	};
	
	handleLogin = async e => {
		e.preventDefault();
		const { username, password } = this.state;
		if (!username || !password){
			this.setState({
				error: "Falta username ou password"
			});
		} else {
			try {
				//await api.post("/oauth", {username, password});
				login("fsaff");
				//login(response.data.token);
				this.props.history.push("/app");
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
				<Form onSubmit={this.handleLogin}>
					{ this.state.error && <p>{this.state.error}</p>}
					<p>Usuário
					<input type="text"
					onChange={e => this.setState({username: e.target.value})}/>
					</p>
					<p>Senha
					<input type="password"
					onChange={e => this.setState({password: e.target.value})}/>
					</p>
					<button type="submit">Entrar</button>
					<Link to="/registrar">Criar conta</Link>
				</Form>
			</Container>
		);
	}
}
export default withRouter(Login);
