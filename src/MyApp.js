import React, { Component } from 'react';
import Article from './Article/Article';
import ArticleDetail from './Article/ArticleDetail';
import Personal from './Personal/Personal';
import Gym from './Gym';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouteNavItem from "./RouteNavItem";


// import { Button, Grid, Row, Col, Panel, FormGroup, FormControl, ControlLabel, Nav, NavItem } from 'react-bootstrap';
// import ReactDOM from 'react-dom';
// import MarkdownRenderer from 'react-markdown-renderer';

class MyApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'article'
		};
	}

	render() {
		return(
	<BrowserRouter>
		<div>
			<ul className='nav nav-tabs' >
				<li className='nav-item'>
					<RouteNavItem  href="/article" title='Article'>Article</RouteNavItem>
				</li>
				<li className='nav-item'>
					<RouteNavItem  href="/personal" title="Personal">Personal</RouteNavItem>
				</li>
				<li className='nav-item'>
					<RouteNavItem href="/gym" title="Gym">Gym</RouteNavItem>
				</li>
			</ul>
			<br />
			<div>
				<div>
					<div sm={12}>
						<Switch>
							<Route path='/article/:number/:test' render={(props) => (<Article aaa={props.match} />)} />
						  <Route path='/article/:number' render={(props) => (<ArticleDetail articleId={props.match.params.number} />)}/>
							<Route path='/article' component={Article}/>
							<Route path='/gym' component={Gym}/>
						  <Route path='/personal' component={Personal}/>
						</Switch>
					</div>
				</div>
			</div>
		</div>
 </BrowserRouter>
		);
	}
}

export default MyApp;
