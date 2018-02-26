import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from './Message';
import GymList from './GymList';
import Chart from './Chart';
import AjaxHelperClass from "./ajaxHelper";

class Gym extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			gyms: null,
			date: '',
			type: '',
			gymValue: '',
			message: '',
			errorMessage: '',
			items: null,
			loadIemsError: null,
			ajaxHelper: AjaxHelperClass,
		};
		this.handleDate = this.handleDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGymValue = this.handleGymValue.bind(this);
		this.handleType = this.handleType.bind(this);

		//form default
		this.state.type = 2;

	}

	componentDidMount() {

		var callback = ((result) => {
			this.setState({ items: result });
		}).bind(this);

		this.state.ajaxHelper.gymList(callback, this.state.type);
	}

	render() {
		return(
			this.addForm()
		);
	}

	handleDate(e) {
		this.setState({ date: e.target.value });
	}

	handleGymValue(e) {
		this.setState({ gymValue: e.target.value });
	}

	handleType(e) {
		const typeId = e.target.value;
		var callback = ((res, typeId) => {
			this.setState({
				type: typeId,
				items: res,
			});
		}).bind(this);
		this.loadItems(callback, typeId);
	}

	handleSubmit(e) {
		// this.clearMessages();
		const callback = function(res) {
			if(res.status === 200) {
				this.state.ajaxHelper.gymList((function(res, typeId) {
					this.setState({
						items: res,
						message: 'ok uložení proběhlo v pořádku',
						gymValue: '',
						date: '',
					});
				}).bind(this), this.state.type);
			} else {
				this.setState({ errorMessage: res.status + ': ' + res.statusText });
				//console.log(res);
			}
		}.bind(this);

		this.state.ajaxHelper.gymSave(this.state.date, this.state.gymValue, this.state.type, callback);
		e.preventDefault();
	}

	handleDelete(e, i) {
		// console.log(i);
		fetch('/gym/' + i, { method: 'delete' }).then(response => response.json().then(json => {
			// console.log(json);
			this.loadItems((function(res) {
				this.setState({
					items: res,
				});
			}).bind(this), this.state.type);
		}));
	}

	addForm() {
		const message = this.state.message;
		const errorMessage = this.state.errorMessage;
		const items = this.state.items;
		return(

			<div className='row'>
				<div className='col-md-6'>
					<div>
						{message !== null && <b>{message}</b>}
						{errorMessage !== null && <b style={{color: 'red'}}>{errorMessage}</b>}
					</div>
						<form onSubmit={this.handleSubmit} className='form-horizontal'>
							<div className='form-group'>
								<label htmlFor='dateId' >Date</label>

								<input type='date' id='dateId' className='form-control' onChange={this.handleDate} value={this.state.date} />
									<div className="form-group">
	    							<label htmlFor="exampleFormControlSelect1">Example select</label>
										<select className="form-control" onChange={this.handleType} value={this.state.type} >
									  	<option value='1' >1</option>
									    <option value='2' >2</option>
											<option value='3' >3</option>
									  </select>
									</div>
							</div>
							<div className='form-group'>
								<input type='number' onChange={this.handleGymValue} value={this.state.gymValue} />
								<input type='submit' value='add' />
							</div>
						</form>
						<Chart items={items}  />
					</div>
					<div className='col-md-6'>
						<GymList items={items} error={this.state.loadIemsError} onDeleteClick={(e, i)=>this.handleDelete(e, i)} />
					</div>
				</div>
		);
	}

	loadItems(callback, typeId) {
		fetch('/gym?type=1&order=desc&type=' + typeId)
			.then(res => res.json())
			.then((result) => {
				if(result.ok === false) {
					this.setState({
						loadIemsError: result.status + ' ' + result.statusText,
					});
				} else {
					callback(result, typeId);
				}
			});
	}

	clearMessages() {
		console.log('cleaaar');
		this.setState({
			message: '',
			errorMessage: '',
		});
	}


}

export default Gym;
