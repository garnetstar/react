import React, { Component } from 'react';
import MarkdownRenderer from 'react-markdown-renderer';
import AjaxHelperClass from "../ajaxHelper";

class ArticleEdit extends Component {
	constructor(props) {
		super(props);
		this.state = {
      articleId: this.props.articleId,
			article: null,
			isLoaded: false,
			content: this.props.content,
			ajaxHelper: AjaxHelperClass,
		};

		this.handleContent = this.handleContent.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTitle = this.handleTitle.bind(this);
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

	handleSubmit(e) {
	e.preventDefault();
		const callback = function(res) {
		};
		console.log(this.state.content);
		console.log(this.state.article.content);
		this.state.ajaxHelper.articleSave(this.state.articleId, this.state.article.title, this.state.article.content, callback);

	}

	handleContent(e) {
		const content = e.target.value;
		const newArticle = {title: this.state.article.title, content: content};
		this.setState({
			article : newArticle,
		});
	}

	handleTitle(e) {
		const title = e.target.value;
		const newArticle = {title: title, content: this.state.article.content};
		this.setState({
			article: newArticle,
		});
	}

	render() {
		if(this.state.isLoaded === true) {
			return(
				<div className='row'>
        	<div className='col-sm-6'>
						<form onSubmit={this.handleSubmit}>
						<div className='form-group'>
							<input type='text' onChange={this.handleTitle} value={this.state.article.title} />
						</div>
						<div className="form-group">
        			<textarea className='form-control' onChange={this.handleContent} value={this.state.article.content} rows='25' />
						</div>
						<div className='form-group'>
							<input type='submit' value='add' />
						</div>
					</form>
        	</div>
        <div className='col-sm-6'>
					<div className='border'>
          	<MarkdownRenderer markdown={this.state.article.content} />
					</div>
        </div>
      </div>
			);
		} else {
      return (
			<div>Loading ...</div>
    );
		}
	}
}

export default ArticleEdit;