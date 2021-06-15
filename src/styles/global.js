import { injectGlobal } from "styled-components";

import "font-awesome/css/font-awesome.css";

injectGlobal `
* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
	outline: 0;
}
body, html {
	background: #eee;
	font-family: 'Helveteica Neue', 'Helvetica', Arial;
	height: 100%;
	width: 100%;
}
`;


