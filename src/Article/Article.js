import React, { Component } from 'react';
import ArticleDetail from './ArticleDetail';
import { Link } from 'react-router-dom';

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gyms: null,
			isLoaded: false,
			articleId: props.articleId,
		};
		// this.setState({articleId: props.articleId});
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

componentWillReceiveProps(nextProps){
	this.setState({articleId: nextProps.articleId});
}
	render() {
		if(this.state.error) {
			return(<b>Error</b>);
		} else if(this.state.isLoaded === true) {
			return(
				this.renderList()
			);
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
		const articleIdConst = this.state.articleId;
		//console.log(props);
		// const css = (article.articleId !== articleId) ? '' :' active';
		return(
			<div>
				<br/>
			<div className='row'>
				<div className='col-sm-3'>
					<div className="list-group">
						{articles.map((article, key)=>
		           <Link key={key}
								 to={`/article/${article.article_id}`}
								 className={'list-group-item list-group-item-action' + (article.article_id === articleIdConst ? ' active': '') }
								 >
								 {article.title}
							 </Link>
					 )}
					</div>
				</div>
				<div className='col-sm-9'>
					<ArticleDetail articleId={articleIdConst} />
					<div onClick={this.handleClickList} >Back</div>
				</div>
			</div>
		</div>
		);
	}
}
export default Article;
