import React, { Component } from 'react';
import Article from './Article/Article';
import ArticleDetail from './Article/ArticleDetail';
import Personal from './Personal/Personal';
import { Link } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RouteNavItem from "./RouteNavItem";


import { Button, Grid, Row, Col, Panel, FormGroup, FormControl, ControlLabel, Nav, NavItem } from 'react-bootstrap';
// import ReactDOM from 'react-dom';
// import MarkdownRenderer from 'react-markdown-renderer';

class MyApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			context: 'article'
		};
		this.handleChangeContext = this.handleChangeContext.bind(this);
	}

	handleChangeContext(context) {
		this.setState({ context: context });
	}

	render() {
		// console.log(this.state.context);
		// let toRender = null;
		// if(this.state.context == 'article') {
		// 	toRender = <Article />;
		// } else if(this.state.context == 'personal') {
		// 	toRender = <Personal />;
		// }
		// console.log(toRender);
		return(
			<BrowserRouter>
			<div>

				<Nav bsStyle="tabs" activeKey={this.state.context} onSelect={this.handleChangeContext}>
				    <RouteNavItem eventKey={'article'} href="/article" title='Article'>Article</RouteNavItem>
				    <RouteNavItem eventKey={'personal'} href="/personal" title="Personal">Personal</RouteNavItem>
				  </Nav>
			<br />
			<Grid>
				<Row>
					<Col sm={12}>
<Link to='/article/2' >sssss</Link>
						<Switch>
						   <Route exact path='/' component={Article}/>
						  {/* both /roster and /roster/:number begin with /roster */}


						  <Route path='/article/:number' render={(props) => (<ArticleDetail articleId={props.match.params.number} />)}/>
									   <Route path='/article' component={Article}/>
						   <Route path='/personal' component={Personal}/>

						</Switch>
					</Col>
				</Row>
			</Grid>
		 </div>
 </BrowserRouter>
		);
	}
}

export default MyApp;
