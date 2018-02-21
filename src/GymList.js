import React, { Component } from 'react';

class GymList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: null,
			error: null,
			deleteHandler: null,
			onDeleteClick: props.onDeleteClick,
		};

		this.handleDelete = this.handleDelete.bind(this);
	}

	render() {
		if(this.props.error) {
			return(<b>{this.props.error}</b>);
		} else if(this.props.items === null) {
			return(<div>Loading....</div>);
		} else {
			return(

				this.listItems()
			);
		}
	}

	// handleClick(e) {
	// 	e.preventDefault;
	// 	onClick={props.onClick}
	// 	window.confirm('really delete ?');
	// }
	handleDelete(e, id) {
		if(window.confirm('really delete ?')) {
			this.state.onDeleteClick(e, id);
		}
	}

	listItems() {
		const items = this.props.items;
		console.log(items);
		return(
			<table className='table table-bordered'>
				<tbody>
			{items.map((item, i) => <tr  key={item.gym_id}>
																<td>{item.value}</td>
																<td>{this.convertTimestamp(item.timestamp)}</td>
																<td><a href='#' onClick={(e) => this.handleDelete(e, item.gym_id)}>delete</a></td>
															</tr>
								)}
</tbody>
		</table>
		);
	}

	convertTimestamp(stamp) {
		var date = new Date(stamp);
		return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
	}
}

export default GymList;
