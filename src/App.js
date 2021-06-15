//import logo from './logo.svg';
//import './App.css';
import React, { Fragment } from 'react';
import { CssBaseline, withStyles } from '@material-ui/core';
//import "./styles/global";
import Routes from "./routes";
import AppHeader from './components/AppHeader';
import Home from './pages/Home';

const App = () => <Routes />;
export default App;
/*const styles = theme => ({
	main: {
		padding: theme.spacing(3),
	},
});

const App = ({ classes }) => (
	<Fragment>
		<CssBaseline/>
		<AppHeader />
		<main className={classes.main}>
			<Home />
		</main>
	</Fragment>
);
export default withStyles(styles)(App);
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

//export default App;
