import React, { Component } from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';
import One from './One';

class Layout extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded:false,
      inputTags:null,
      outpupTags:Array(0),
    };

    this.handleClickLeft = this.handleClickLeft.bind(this);
    this.handleClickRight = this.handleClickRight.bind(this);
  }

  componentDidMount() {
    fetch('/tag')
    .then(res=>res.json())
    .then((result)=>{
      this.serad(result);
      this.setState({
        inputTags:result,
        isLoaded:true,
      })
    });
  }

  handleClickLeft(i,e){
    var inputTags = this.state.inputTags;
    var newInputTags = Array(0);
    var newOutputTags = this.state.outpupTags;
    inputTags.map(
        (item)=>{
          if(item.tag_id != i){
          newInputTags.push(item);
        } else {
          newOutputTags.push(item);
        }
      }
    );
    this.serad(newInputTags);
    this.serad(newOutputTags);
    this.setState({inputTags:newInputTags});
    this.setState({outpupTags:newOutputTags});
    console.log(newInputTags);
  }

  handleClickRight(i,e){
    var outpupTags = this.state.outpupTags;
    var newInputTags = this.state.inputTags;
    var newOutputTags = Array(0);
    outpupTags.map((item)=>{
        if(item.tag_id != i){
        newOutputTags.push(item);
      }
      else {
        newInputTags.push(item);
      }
    }
  );
  this.serad(newInputTags);
  this.serad(newOutputTags);
    this.setState({inputTags:newInputTags});
    this.setState({outpupTags:newOutputTags});
  }

  render() {
    const tags = this.state.inputTags;
    const leftTags = this.state.outpupTags;
    console.log(leftTags);
    if(this.state.isLoaded) {
    return (
      <Grid>
        <h1>React</h1>
        <Row>
          <Col sm={6}>
            <Panel header='left'>
              <One tags={tags} onClick={this.handleClickLeft} />
            </Panel>
          </Col>
          <Col sm={6}>
            <Panel header='right'>
              <One
                tags={leftTags}
                onClick={this.handleClickRight} />
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
  serad(items) {
    items.sort((a,b)=>{
      return a.name>b.name;
    });
  }
}


export default Layout;
