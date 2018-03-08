import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import RouteNavItem from "../RouteNavItem";


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

	componentWillReceiveProps(nextProps) {
		if(nextProps.articleId !== this.props.articleId) {
			fetch('/article/' + nextProps.articleId)
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
	}

	render() {
		if(this.state.isLoaded) {
			const url = '/article/edit/' + this.state.article.article_id;
			return(
				<div>
						<RouteNavItem href={url} title="Edit">Edit</RouteNavItem>
        <b>{this.state.article.title}</b>
				{this.state.article.content && (
						<MarkdownRenderer markdown={this.state.article.content} />
				)}


      </div>

			);
		} else {
			return(<div>Loading...</div>);
		}
	}

}
export default ArticleDetail;
