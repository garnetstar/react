import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

class Gym extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			gyms: null,
			date: null,
			gymValue: null,
		};
		this.handleDate = this.handleDate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleGymValue = this.handleGymValue.bind(this);
	}

	componentDidMount() {
		fetch('/gym')
			.then(res => res.json())
			.then((result) => {
					this.setState({
						gyms: result,
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
		if(this.state.error) {
			return(<b>Error</b>);
		} else if(this.state.isLoaded === true) {
			console.log(this.state.gyms);
			return(
				this.addForm()
			);
		} else {
			return(<div>Loading...</div>);
		}
	}

	handleDate(e) {
		this.state.date = e.target.value;
	}

	handleGymValue(e) {
		this.state.gymValue = e.target.value;
	}

	handleSubmit(e) {

		console.log(this.state.gymValue);
		console.log(this.state.date);
		//syntetic event - po prvním volání přestává existovat
		const target = e.target;
		fetch('/gym', {
				method: 'POST',
				// headers: {
				// 	'Accept': 'application/json',
				// 	'Content-Type': 'application/json',
				// },
				body: JSON.stringify({
					date: this.state.date,
					value: this.state.gymValue,
					type: 1
				})
			})
			.then(function(res) {
				//po úspěchu resetovat form
				target.reset();

				console.log(res);
			})
			.catch(function(res) { console.log('Error in Gym') })

		// .then(function(res) { res.json().then(function(res2){console.log(res2);}) })
		// .catch(function(res) { console.log('dddddddddddd') })

		e.preventDefault();
	}

	addForm() {
		return(
			<div>
					<form onSubmit={this.handleSubmit} className='form-horizontal'>
						<div className='form-group'>
							<label htmlFor='dateId' >Date</label>

							<input type='date' id='dateId' className='form-control' onChange={this.handleDate} value={this.state.date} />

						</div>
						<input type='number' onChange={this.handleGymValue} value={this.state.gymValue} />
						<input type='submit' value='add' />
					</form>
				</div>
		);
	}
}

export default Gym;
