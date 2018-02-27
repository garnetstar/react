import React, { Component } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

class Chart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
		};
	}

	render() {

		var data = [];

		if(this.props.items !== null) {

			this.props.items.map(((item) => {
				data.push({
					datum: this.convertTimestamp(item.timestamp),
					value: item.value,
					timestamp: item.timestamp,
				});

				data.sort(
					function(a,b) {
						if(a.timestamp < b.timestamp) {
							return -1;
						}
						if(a.timestamp >= b.timestamp) {
							return 1;
						}
						return true;
					}
				);
				return true;
			}));
		}

		return(

      <LineChart width={500} height={300} data={data}>
		  <Line type="monotone" dataKey="value" stroke="#8884d8" />
		  <CartesianGrid stroke="#ccc" />
		  <XAxis
				dataKey={'datum'}

				/>
		  <YAxis
				dataKey={'datum'}
						name='stature'
						unit='kg'
						domain={[80, 100]}
						type="number"

				  />
			<Tooltip />
		</LineChart>

		);
	}

	convertTimestamp(stamp) {
		var date = new Date(stamp);
		var month = parseInt(date.getMonth());
		month++;
		return date.getDate() + '.' + month + '.' + date.getFullYear();
	}

}

export default Chart;
