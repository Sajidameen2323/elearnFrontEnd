import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
   Tabs, Tab, Modal, Button
} from 'react-bootstrap';
import {
  NavLink
} from "react-router-dom";
import Axios from 'axios';


function Search() {
  return (<div className="container mt-5">

    <Tabs defaultActiveKey="candidates" id="uncontrolled-tab-example" className="pt-5">
      <Tab eventKey="candidates" title="Candidates" onSelect={SearchCandidate}>
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
        srchr: [],
        currentUrl:'',
        show:false,
        dltId:'5'
  
      }
    };

    componentDidMount() {
      let str = window.location.href.replace('3000/search', '3001/api/search/candidate');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.registration_no, el.firstname, el.lastname, el.email, el.industry, el.profilepic]
        })
        this.setState({
          srchr: temp,
          currentUrl:window.location.href
        })
      })
    };


    componentDidUpdate(){
        if(window.location.href !== this.state.currentUrl){
        let str = window.location.href.replace('3000/search', '3001/api/search/candidate');
        Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.registration_no, el.firstname, el.lastname, el.email, el.industry, el.profilepic]
        })
        this.setState({
          srchr: temp,
          currentUrl:window.location.href
        })
      })
  }

    }



  deleteUser(e){
    let k = this.state.dltId;
    Axios.delete(`http://localhost:3001/api/userDelete?id=${k}`).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    });
    window.location.reload();
  }
    handleShow(e){
    this.setState({
      show:!this.state.show,
      dltId:e.target.getAttribute('data-remove')
    })
  }
  handleClose(){
    this.setState({
      show:!this.state.show
    })
  }
  testee(){
    this.setState({
      dltId:'state mutating'
    })
  }
  
    render() {
      return (
        <div className="">
          <h5 className="pt-3 pl-5">Search results Found: {this.state.srchr.length}</h5>
          <div className="table-responsive mt-3 " data-spy="scroll">
            <table className="table thead-dark table-striped table-hover table-bordered ">
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
                  return (<tr key={el[0]}>
                    <td>{el[0]}</td>
                    <td>{el[1]}</td>
                    <td>{el[2]}</td>
                    <td>{el[3]}</td>
                    <td>{el[4]}</td>
                    <td><img 
                      src={`${process.env.PUBLIC_URL}/profilepics/${el[5]}`}
                      alt="logo" /></td>
                      <td><button type="submit" className="btn btn-outline-danger btn-sm" data-remove={el[0]}
                 onClick={this.handleShow.bind(this)} data-toggle="tooltip" data-placement="right" title="Delete User">Del</button>

              <NavLink activeClassName="active" to={`/editCandidate/${el[0]}`} className="btn btn-outline-success btn-sm"
                     data-toggle="tooltip" data-placement="right" title="Edit User">Edit</NavLink>



      <Modal show={this.state.show} onHide={this.handleClose.bind(this)} animation={true} centered 
      aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>Resistration Number {this.state.dltId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this candidate ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button variant="danger" onClick={this.deleteUser.bind(this)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>








                    </td>
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
        srchr: [],
        currentUrl:''
  
      }
    };


    componentDidMount() {
      let str = window.location.href.replace('3000/search', '3001/api/search/result');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed.split('T')[0],el.cand_reg_no]
        })
        this.setState({
          srchr: temp,
          currentUrl:window.location.href
        })
      })
    };

    componentDidUpdate(){

          if(window.location.href !== this.state.currentUrl){
                        let str = window.location.href.replace('3000/search', '3001/api/search/result');
      Axios.get(str).then((res) => {
        let temp = res.data.map((el) => {
          return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed.split('T')[0],el.cand_reg_no]
        })
        this.setState({
          srchr: temp,
          currentUrl:window.location.href
        })
      })
  }


    }


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
        <div className="">
          <h5 className="pt-3 pl-5">Search results Found: {this.state.srchr.length}</h5>
          <div className="table-responsive mt-3" data-spy="scroll">
            <table className="table thead-dark table-striped table-hover table-bordered m-3">
              <thead className="thead-dark">
                <tr >
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
  
                {this.state.srchr.map((el,ind) => {
                  return (<tr key={ind}>
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