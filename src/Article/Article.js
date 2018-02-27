import React, { Component } from 'react';
import ArticleDetail from './ArticleDetail';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gyms: null,
			isLoaded: false,
		};
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
				console.log(this.state.aaa);
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
				<div onClick={this.handleClickList} >Back</div>
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
