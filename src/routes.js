import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//npm install react-router-dom axios styled-components prop-types font-awesome

import { isAuthenticated } from "./services/auth";
import Registrar from "./pages/Registrar";
import Login from "./pages/Login";

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
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/registrar" component={Registrar} />
			<PrivateRoute path="/app" component={() => <h3>App</h3>} />
			<Route path="*" component={() => <h3>404 não encontrado</h3>} />
		</Switch>
	</BrowserRouter>
)

export default Routes;
