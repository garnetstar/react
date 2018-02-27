import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MarkdownRenderer from 'react-markdown-renderer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class ArticleDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			articleId: this.props.articleId,
			article: null,
			isLoaded: false,
		};
	}

	componentDidMount() {
		fetch('/article/' + this.state.articleId)
			.then(res => res.json())
			.then((result) => {
					this.setState({
						article: result,
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

	render() {
		if(this.state.isLoaded) {
			console.log(this.state);

			return(
				<div>
        <b>{this.state.article.title}</b>
      <div>{this.state.article.content}</div>
      </div>

			);
		} else {
      return(<div>Loading...</div>);
    }
	}

}
export default ArticleDetail;
