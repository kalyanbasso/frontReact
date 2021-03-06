import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useLocation } from "react-router-dom";
import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import DarkModeToggle from "react-dark-mode-toggle";

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
import NovoProjeto from "./pages/NovoProjeto"
import NovaPrioridade from "./pages/NovaPrioridade"
import NovoUsuario from "./pages/NovoUsuario"
import NovoComentario from "./pages/NovoComentario"
import NovoGrupo from "./pages/NovoGrupo"
import NovaTarefa from "./pages/NovaTarefa"
import Dashboard from "./pages/Dashboard";
import NovoStatus from "./pages/NovoStatus"
import NovoTipo from "./pages/NovoTipo";


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

const Routes = () => {
	const [isDarkMode, setIsDarkMode] = React.useState(() => false);

	return (
		<ThemeContextWrapper>
			<BrowserRouter>
			<div style={{ display: 'flex' }}>
				<div className="main-panel" data={"blue"}>
					<Switch>
						<Route exact path="/" component={Login} />
						<Route path="/registrar" component={Registrar} />
						<PrivateRoute path="/sistema" component={Sistema} />
						<PrivateRoute path="/dashboard" component={Dashboard} />
						<PrivateRoute path="/projeto" component={Projeto} />
						<PrivateRoute path="/prioridade" component={Prioridade} />
						<PrivateRoute path="/usuario" component={Usuario} />
						<PrivateRoute path="/projeto-usuarios" component={UsuarioProjeto} />
						<PrivateRoute path="/comentario" component={Comentario} />
						<PrivateRoute path="/grupo" component={Grupo} />
						<PrivateRoute path="/tarefa" component={Tarefa} />
						<PrivateRoute path="/tarefa-tipo" component={TarefaTipo} />
						<PrivateRoute path="/tarefa-status" component={TarefaStatus} />
						<PrivateRoute path="/novo-sistema/:id?" component={NovoSistema} />
						<PrivateRoute path="/novo-projeto/:id?" component={NovoProjeto} />
						<PrivateRoute path="/nova-prioridade/:id?" component={NovaPrioridade} />
						<PrivateRoute path="/novo-usuario/:id?" component={NovoUsuario} />
						<PrivateRoute path="/novo-comentario/:id?" component={NovoComentario} />
						<PrivateRoute path="/novo-grupo/:id?" component={NovoGrupo} />
						<PrivateRoute path="/nova-tarefa/:id?" component={NovaTarefa} />
						<PrivateRoute path="/novo-status/:id?" component={NovoStatus} />
						<PrivateRoute path="/novo-tipo/:id?" component={NovoTipo} />
						<Route path="*" component={() => <h3>404 n??o encontrado</h3>} />
					</Switch>
				</div>
			</div>
			</BrowserRouter>
		</ThemeContextWrapper>
	)
}

export default Routes;
