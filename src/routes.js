import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//npm install react-router-dom axios styled-components prop-types font-awesome

import { isAuthenticated } from "./services/auth";
import Registrar from "./pages/Registrar";
import Login from "./pages/Login";
import Sistema from "./pages/Sistema";
import Projeto from "./pages/Projeto";
import Prioridade from "./pages/Prioridade";
import Usuario from "./pages/Usuario";
import UsuarioProjeto from "./pages/UsuarioProjeto";
import Comentario from "./pages/Comentario";
import Tarefa from "./pages/Tarefa";
import Grupo from "./pages/Grupo";
import TarefaTipo from "./pages/TarefaTipo";
import TarefaStatus from "./pages/TarefaStatus";
import NovoSistema from "./pages/NovoSistema"
import Navbar from "./components/navbar/NavBar";

const PrivateRoute = ({ component: Component, ...rest}) => (
	<Route
		{...rest}
		render={props =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/", state: { from: props.location } }} />
			)
		}
	/>
);

const Routes = () => (
	<BrowserRouter>
	<div style={{ display: 'flex' }}>
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/registrar" component={Registrar} />
			<PrivateRoute path="/sistema" component={Sistema} />
			<PrivateRoute path="/projeto" component={Projeto} />
			<PrivateRoute path="/prioridade" component={Prioridade} />
			<PrivateRoute path="/usuario" component={Usuario} />
			<PrivateRoute path="/projeto-usuarios" component={UsuarioProjeto} />
			<PrivateRoute path="/comentario" component={Comentario} />
			<PrivateRoute path="/grupo" component={Grupo} />
			<PrivateRoute path="/tarefa" component={Tarefa} />
			<PrivateRoute path="/tarefa-tipo" component={TarefaTipo} />
			<PrivateRoute path="/tarefa-status" component={TarefaStatus} />
			<PrivateRoute path="/novo-sistema" component={NovoSistema} />
			<Route path="*" component={() => <h3>404 não encontrado</h3>} />
		</Switch>
	</div>
	</BrowserRouter>
)

export default Routes;
