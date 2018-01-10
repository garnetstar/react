import React, { Component } from 'react';
import ArticleDetail from './ArticleDetail';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articles: null,
			isLoaded: false,
			articleId: null
		};
		this.handleClickArticle = this.handleClickArticle.bind(this);
		this.handleClickList = this.handleClickList.bind(this);
	}

	componentDidMount() {
		fetch('/article')
			.then(res => res.json())
			.then((result) => {
					this.setState({
						articles: result,
						isLoaded: true,
					})
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			);
	}

	handleClickArticle(i, e) {
		this.setState({
			articleId: i,
		});
	}

	handleClickList(e) {
		e.preventDefault();
		this.setState({
			articleId: null,
		})
	}

	render() {

		if(this.state.error) {
			return(<b>Error</b>);
		} else if(this.state.isLoaded === true) {
			if(this.state.articleId != null) {

				return(this.renderDetail());
			} else {
				// list of articles
				return(this.renderList());
			}
		} else {
			return(
				<div>Loading...</div>
			);
		}
	}

	renderDetail() {
		return(
			<div>
				<ArticleDetail articleId={this.state.articleId} />
				<Button onClick={this.handleClickList} >Back</Button>
			</div>);
	}

	renderList() {
		let articles = this.state.articles;
		return(
			<ul class="nav nav-tabs nav-stacked">
				{articles.map(article=>(
				<li key={article.article_id}>
            <Link to={`/article/${article.article_id}`}>{article.title}</Link>
          </li>
				))}
			</ul>
		);
	}
}
export default Article;
