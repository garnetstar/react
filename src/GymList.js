import React, { Component } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { Link } from 'react-router-dom';

class GymList extends Component {
	constructor(props) {
    super(props);
    this.state = {
      items: null,
      isLoaded: false,
    };
	}

  componentDidMount() {
    fetch('/gym')
      .then(res => res.json())
      .then((result) => {
          this.setState({
            items: result,
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
      return(
        this.listItems()
      );
    } else {
      return(<div>Loading...</div>);
    }
  }

  listItems() {
    console.log(this.state.items);
    return (
      <div>List</div>
    );
  }
}

export default GymList;
