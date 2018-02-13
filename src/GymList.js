import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class GymList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: null,
			error: null,
			isLoaded: false,
		};
	}

	componentDidMount() {
		// fetch('/gym?type=1&order=desc')
		//   .then(res => res.json())
		//   .then((result) => {
		//       this.setState({
		//         items: result,
		//         isLoaded: true,
		//       })
		//     },
		//     (error) => {
		//       this.setState({
		//         isLoaded: true,
		//         error
		//       });
		//     }
		//   );

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
		// console.log(this.props.items);
		// if(this.state.error) {
		//   return(<b>Error</b>);
		// } else if(this.state.isLoaded === true) {
		//   return(
		//     this.listItems()
		//   );
		// } else {
		//   return(<div>Loading...</div>);
		// }
	}

	listItems() {
		const items = this.props.items;
		console.log(items);
		return(
			<table className='table table-bordered'>
			{items.map((item, i) => <tr  key={item.gym_id}>
																<td>{item.value}</td>
																<td>{this.convertTimestamp(item.timestamp)}</td>
															</tr>
								)}
		</table>
		);
	}

	convertTimestamp(stamp) {
		var date = new Date(stamp);
		return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
	}
}

export default GymList;
