import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
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

function Search() {
  return (<div className="container m-5">

    <Tabs defaultActiveKey="candidates" id="uncontrolled-tab-example" className="pt-5">
      <Tab eventKey="candidates" title="Candidates">
        <SearchCandidate />
      </Tab>
      <Tab eventKey="results" title="Results">
        <SearchResult />
      </Tab>
    </Tabs>

  </div>)
};


class SearchCandidate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        srchr: []
  
      }
    };
    componentDidUpdate() {
      let str = window.location.href.replace('3000/search', '3001/api/search/candidate');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.registration_no, el.firstname, el.lastname, el.email, el.industry, el.profilepic]
        })
        this.setState({
          srchr: temp
        })
      })
    };
    componentDidMount() {
      let str = window.location.href.replace('3000/search', '3001/api/search/candidate');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.registration_no, el.firstname, el.lastname, el.email, el.industry, el.profilepic]
        })
        this.setState({
          srchr: temp
        })
      })
    };
    deleteUser(e){
      let id = e.target.getAttribute("data-remove");
      alert(`about to delete id ${id}`);
      Axios.delete(`http://localhost:3001/api/userDelete?id=${id}`).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      });
    }
  
  
    render() {
      return (
        <div className="pt-5">
          <h5 className="pt-3 pl-5">Search results Found: {this.state.srchr.length}</h5>
          <div className="table-responsive mt-5 ml-3" data-spy="scroll">
            <table className="table thead-dark table-striped table-hover table-bordered m-3">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" >User Id</th>
                  <th scope="col" >First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Industry</th>
                  <th scope="col">Profile pic</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
  
                {this.state.srchr.map((el) => {
                  return (<tr>
                    <td>{el[0]}</td>
                    <td>{el[1]}</td>
                    <td>{el[2]}</td>
                    <td>{el[3]}</td>
                    <td>{el[4]}</td>
                    <td><img className="img-fluid"
                      src={`${process.env.PUBLIC_URL}/profilepics/${el[5]}`}
                      alt="logo" /></td>
                      <td><button className="btn btn-sm btn-outline-danger" data-remove={el[0]}
                  onClick={this.deleteUser.bind(this)}>Del</button>
                  <button className="btn btn-sm btn-outline-success">
                    Edit</button></td>
                  </tr>)
                })}
  
              </tbody>
            </table>
  
          </div>
        </div>
  
      )
    }
  };

  class SearchResult extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        srchr: []
  
      }
    };
    componentDidUpdate() {
      let str = window.location.href.replace('3000/search', '3001/api/search/result');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed.split('T')[0],el.cand_reg_no]
        })
        this.setState({
          srchr: temp
        })
      })
    };
    componentDidMount() {
      let str = window.location.href.replace('3000/search', '3001/api/search/result');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed.split('T')[0],el.cand_reg_no]
        })
        this.setState({
          srchr: temp
        })
      })
    };
    deleteUser(e){
      let id = e.target.getAttribute("data-remove");
      alert(`about to delete id ${id}`);
      Axios.delete(`http://localhost:3001/api/userDelete?id=${id}`).then((res)=>{
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      });
    }
  
  
    render() {
      return (
        <div className="pt-5">
          <h5 className="pt-3 pl-5">Search results Found: {this.state.srchr.length}</h5>
          <div className="table-responsive mt-5 ml-3" data-spy="scroll">
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
  
                {this.state.srchr.map((el) => {
                  return (<tr>
                  <td>{el[8]}</td>
                  <td>{el[0]} {el[1]}</td>
                  <td>{el[2]}</td>
                  <td>{el[3]}</td>
                  <td>{el[4]}</td>
                  <td>{el[5]}</td>
                  <td>{el[6]}</td>
                  <td>{el[7]}</td>
                  
                  </tr>)
                })}
  
              </tbody>
            </table>
  
          </div>
        </div>
  
      )
    }
  };

 

  export default Search;