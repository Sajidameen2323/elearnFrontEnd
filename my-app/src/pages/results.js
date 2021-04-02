import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import AddResult from './addResult.js';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Col, Row, ToggleButtonGroup
  , ToggleButton, Tabs, Tab
} from 'react-bootstrap';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";




function Results() {
  return (<div className="container m-5">

    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="pt-5">
      <Tab eventKey="home" title="All">
        <Results1 />
      </Tab>
      <Tab eventKey="add" title="Add Result">
        <AddResult />
      </Tab>
    </Tabs>

  </div>)
};

class Results1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      filter: false,
      filterDate: null
    }
  }
  componentDidMount() {

    Axios.get('http://localhost:3001/api/results').then((res) => {
      let temp = res.data.map((el) => {
        return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed,el.cand_reg_no]
      })
      this.setState({
        results: temp
      })
    })


  }

  filterBut() {
    Axios.post('http://localhost:3001/api/results/filter',{date:this.state.filterDate}).then((res) => {
      let temp = res.data.map((el) => {
        return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed.split('T')[0],el.cand_reg_no]
      })
      this.setState({
        results: temp
      })
    })
      
  }
  resetFilter() {
    Axios.get('http://localhost:3001/api/results').then((res) => {
      let temp = res.data.map((el) => {
        return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed,el.cand_reg_no]
      })
      this.setState({
        results: temp
      })
    })
  }
  setFilterDate(e) {
    this.setState({
      filterDate: e.target.value
    })
  }

  render() {
    return (<div>
      
      <div className="container">
        <Form className="mt-3">
          <Form.Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" srOnly>
                Name
      </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
                type="Date"
                onChange={this.setFilterDate.bind(this)}
              />
            </Col>
            <Col xs="auto">
              <Button className="mb-2" variant="secondary" onClick={this.filterBut.bind(this)}>
                Filter
      </Button>
            </Col>
            <Col xs="auto">
              <Button className="mb-2" variant="secondary" onClick={this.resetFilter.bind(this)}>
                Reset
      </Button>
            </Col>
          </Form.Row>
        </Form>
        {this.state.filter && <h5>{this.state.filterDate}</h5>}
      </div>
<h5 className="pt-3 pl-5">Results Count: {this.state.results.length}</h5>
      <div className="table-responsive mt-3" data-spy="scroll">
        <table className="table thead-dark table-striped table-hover table-bordered m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col" >Reg No </th>
              <th scope="col" >Full Name</th>
              <th scope="col">Knowledge Area</th>
              <th scope="col">Level</th>
              <th scope="col">Score</th>
              <th scope="col">Assessor</th>
              <th scope="col">Overall</th>
              <th scope="col">Completed</th>

            </tr>
          </thead>
          <tbody>

            {this.state.results.map((el) => {
              return (<tr>
                <td>{el[8]}</td>
                <td>{el[0]} {el[1]}</td>
                <td>{el[2]}</td>
                <td>{el[3]}</td>
                <td>{el[4]}</td>
                <td>{el[5]}</td>
                <td>{el[6]}</td>
                <td>{el[7].split('T')[0]}</td>
              </tr>)
            })}

          </tbody>
        </table>

      </div>
      {this.state.resultsN}
    </div>)
  }
};


export default Results;