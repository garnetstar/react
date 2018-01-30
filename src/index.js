import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MyApp from './MyApp';
import Clock from './Clock';
import Layout from './Layout';
import MarkDownEditor from './MarkDownEditor';
import registerServiceWorker from './registerServiceWorker';
import { Button } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// function Start() {
// 	return(
// 		<div>
//     <div><App /></div>
//     <Clock />
//     <Button bsStyle="primary">Primary</Button>
//     </div>
// 	);
// }

ReactDOM.render(

	<MyApp />,
	document.getElementById('root')
);
registerServiceWorker();
