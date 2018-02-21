import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Message from './Message';
import GymList from './GymList';

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
		};
		this.handleDate = this.handleDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGymValue = this.handleGymValue.bind(this);
		this.handleType = this.handleType.bind(this);

		//form default
		this.state.type = 2;

	}

	componentDidMount() {
		this.loadItems();

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
		this.setState({ type: e.target.value }, function() {
			this.loadItems();
		});

	}

	handleSubmit(e) {
		this.clearMessages();
		//syntetic event - po prvním volání přestává existovat
		const target = e.target;
		console.log(this.state.type);
		fetch('/gym', {
				method: 'POST',
				body: JSON.stringify({
					date: this.state.date,
					value: this.state.gymValue,
					type: this.state.type,
				})
			})
			.then(function(res) {
				if(res.status === 200) {
					this.setState({
						message: 'ok uložení proběhlo v pořádku',
						gymValue: '',
						date: '',
					});
					this.loadItems();
					console.log('success');
				} else {
					this.setState({ errorMessage: res.status + ': ' + res.statusText });
					console.log(res);
				}
			}.bind(this))
			.catch(function(res) { console.log(res) })
		e.preventDefault();
	}

	handleDelete(e, i) {
		console.log(i);
		fetch('/gym/' + i, {method:'delete'}).then(response => response.json().then(json => {
			console.log(json);
			this.loadItems();
		}));
	}

	addForm() {
		const message = this.state.message;
		const errorMessage = this.state.errorMessage;
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
					</div>
					<div className='col-md-6'>
						<GymList items={this.state.items} error={this.state.loadIemsError} onDeleteClick={(e, i)=>this.handleDelete(e, i)} />
					</div>
				</div>


		);
	}

	loadItems() {
		fetch('/gym?type=1&order=desc&type=' + this.state.type)
			.then(res => res.json())
			.then((result) => {
				if(result.ok === false) {
					console.log(result);
					this.setState({
						loadIemsError: result.status + ' ' + result.statusText,
					});
				} else {
					this.setState({
						items: result,
						// isLoaded: true,
					});
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
