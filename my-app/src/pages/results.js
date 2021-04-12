import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import AddResult from './addResult.js';
import {
 Tabs,Tab,Form,Col,Modal
} from 'react-bootstrap';
import Axios from 'axios';





function Results() {
  return (<div className="container mt-5">

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
      filterDate: null,
      dltId:''
    }
  }
  componentDidMount() {

    Axios.get('http://localhost:3001/api/results').then((res) => {
      let temp = res.data.map((el) => {
        return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed,el.cand_reg_no,el.result_id]
      })
      this.setState({
        results: temp
      })
    })


  }

  filterBut() {
    if(this.state.filterDate!==null && this.state.filterDate!==''){
          Axios.post('http://localhost:3001/api/results/filter',{date:this.state.filterDate}).then((res) => {
      let temp = res.data.map((el) => {
        return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed.split('T')[0],el.cand_reg_no,el.result_id]
      })
      this.setState({
        results: temp
      })
    })
    }

      
  }
  resetFilter() {
    Axios.get('http://localhost:3001/api/results').then((res) => {
      let temp = res.data.map((el) => {
        return [el.firstname, el.lastname, el.knowledge_area, el.level, el.score, el.assessor, el.overall, el.completed,el.cand_reg_no,el.result_id]
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

  deleteResult(e){
    let k = this.state.dltId;
    Axios.delete(`http://localhost:3001/api/resultDelete?id=${k}`).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    });
    window.location.reload();
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
                placeholder="Date"
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
<h5 className="pt-3 pl-3">Results Count: {this.state.results.length}</h5>
      <div className="table-responsive mt-3" data-spy="scroll">
        <table className="table thead-dark table-striped table-hover table-bordered m-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col" >Reg No</th>
              <th scope="col" >Result Id</th>
              <th scope="col" >Full Name</th>
              <th scope="col">Knowledge Area</th>
              <th scope="col">Level</th>
              <th scope="col">Score</th>
              <th scope="col">Assessor</th>
              <th scope="col">Overall</th>
              <th scope="col">Completed</th>
              <th scope="col"></th>

            </tr>
          </thead>
          <tbody>

            {this.state.results.map((el,i) => {
              return (<tr key={i}>
                <td>{el[8]}</td>
                <td>{el[9]}</td>
                <td>{el[0]} {el[1]}</td>
                <td>{el[2]}</td>
                <td>{el[3]}</td>
                <td>{el[4]}</td>
                <td>{el[5]}</td>
                <td>{el[6]}</td>
                <td>{el[7].split('T')[0]}</td>
                 <td><button type="submit" className="btn btn-outline-danger btn-sm" data-remove={el[9]}
                  data-toggle="tooltip" onClick={this.handleShow.bind(this)} data-placement="right" title="Delete User">Del</button>

      <Modal show={this.state.show} onHide={this.handleClose.bind(this)} animation={true} centered 
      aria-labelledby="contained-modal-title-vcenter"  >
        <Modal.Header closeButton>
          <Modal.Title>Result Id {this.state.dltId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this result ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose.bind(this)}>
            Close
          </Button>
          <Button variant="danger" onClick={this.deleteResult.bind(this)}>
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
      {this.state.resultsN}
    </div>)
  }
};


export default Results;