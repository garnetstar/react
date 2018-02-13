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
			gymValue: '',
			message: '',
			errorMessage: '',
			items: null,
			loadIemsError: null,
		};
		this.handleDate = this.handleDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGymValue = this.handleGymValue.bind(this);
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

	handleSubmit(e) {
		this.clearMessages();
		//syntetic event - po prvním volání přestává existovat
		const target = e.target;
		fetch('/gym', {
				method: 'POST',
				body: JSON.stringify({
					date: this.state.date,
					value: this.state.gymValue,
					type: 1
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

	addForm() {
		const message = this.state.message;
		const errorMessage = this.state.errorMessage;
		return(

			<div>
				<div>
					{message !== null && <b>{message}</b>}
					{errorMessage !== null && <b style={{color: 'red'}}>{errorMessage}</b>}
				</div>
					<form onSubmit={this.handleSubmit} className='form-horizontal'>
						<div className='form-group'>
							<label htmlFor='dateId' >Date</label>

							<input type='date' id='dateId' className='form-control' onChange={this.handleDate} value={this.state.date} />

						</div>
						<input type='number' onChange={this.handleGymValue} value={this.state.gymValue} />
						<input type='submit' value='add' />
					</form>

					<GymList items={this.state.items} error={this.state.loadIemsError} />
				</div>


		);
	}

	loadItems() {
		fetch('/gym?type=1&order=desc')
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
				}

				// .catch(error) => {
				// 	// console.log(error);
				// 	this.setState({
				// 		// isLoaded: true,
				// 		loadIemsError: 'error happend',
				// 	});
				// }
			);
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
