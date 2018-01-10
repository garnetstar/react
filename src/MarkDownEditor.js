import React, { Component } from 'react';
import { Button, Grid, Row, Col, Panel, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import MarkdownRenderer from 'react-markdown-renderer';

class MarkDownEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			valueTitle: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeTitle = this.handleChangeTitle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

	}

	handleChange(e) {
		this.setState({ value: e.target.value });
	}

	handleChangeTitle(e) {
		this.setState({ valueTitle: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		fetch('/article', {
			method: 'POST',
				// headers: {
				// 	'Accept': 'application/json',
				// 	'Content-Type': 'application/json',
				// },
			body: JSON.stringify({
				title: this.state.valueTitle,
				content: this.state.value,
			})
		})
	}

	render() {
		return(
			<Grid>
        <Row>
					<form onSubmit={this.handleSubmit} >
	          <Col sm={6}>
		          <FormGroup>
		  					<ControlLabel>Source</ControlLabel>
								<FormControl
									type='text'
									onChange={this.handleChangeTitle}
									value={this.state.valueTitle}
								/>
		          	<FormControl
									rows={20}
									componentClass="textarea"
									placeholder="textarea"
									onChange={this.handleChange}
									value={this.state.value}
								/>
								<Button type="submit">Submit</Button>
		          </FormGroup>
	          </Col>
	  			</form>
          <Col sm={6}>
						<FormGroup>
							<ControlLabel>Target</ControlLabel>
							<MarkdownRenderer markdown={this.state.value} />
						</FormGroup>
          </Col>
        </Row>
      </Grid>
		);
	}
}

export default MarkDownEditor;
