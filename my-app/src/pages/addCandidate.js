import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Col, Row, ToggleButtonGroup
  , ToggleButton, Alert
} from 'react-bootstrap';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";

class Insert extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        regNo:null,
        firstname: '',
        lastname: '',
        email: '',
        industry: '',
        selectedFile: null,
        errorText:'',
        emailError:''
  
      }
    };
    addRegNumber(e){
      this.setState({
        regNo:e.target.value
      })
    }
    addFisrtName(e) {
      this.setState({
        firstname: e.target.value
      })
    }
    addLastName(e) {
      this.setState({
        lastname: e.target.value
      })
    }
    addEmail(e) {
      this.setState({
        email: e.target.value
      })
    }
    addIndustry(e) {
      this.setState({
        industry: e.target.value
      })
    }
    addFile(e) {
      console.log(e.target.files[0].type);
      console.log(e.target.files);
      const types = ['image/png', 'image/jpeg', 'image/gif'];
      let fileType = e.target.files[0].type;
      if (types.some((el) => { return el === fileType })) {
        this.setState({
          selectedFile: e.target.files[0],
          loaded: 0
        })
      } else {
        
      }
  
  
    }
    submitData() {
      const data = new FormData();
      console.log(data);
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let chkEmail = re.test(this.state.email);
      if (this.state.firstname !== '' && this.state.lastname !== ''
        && this.state.email !== '' && this.state.industry && this.state.selectedFile !== null && chkEmail) {
        data.append('file', this.state.selectedFile);
        console.log(data);
        Axios.post('http://localhost:3001/api/insert', {registrationNo:this.state.regNo,
          firstname: this.state.firstname, lastname: this.state.lastname,
          email: this.state.email, industry: this.state.industry, profilepic: Date.now().toString().slice(0,9)+'-'+this.state.selectedFile.name
        }).then(() => {
          alert('success');
        });
        Axios.post("http://localhost:3001/api/upload", data, {
        }).then((res) => {
          console.log(res.statusText)
        });
        alert ('Successfully Added');
        this.setState({
          errorText:'',
          emailError:''
        })
      } else if(!chkEmail){
        this.setState({
          emailError:'Enter A Valid Email'
        })
      } else {
        this.setState({
          errorText:'Fill All Fields'
        })
      }
    }
  
    render() {
      return (
        <div>
          <div className="container ">
            <Form className="ml-5 mt-5">

            <Form.Group controlId="formBasicFirstName" as={Col} md="4">
                <Form.Label className="font-weight-bold">Registration Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Registration Number" onChange={this.addRegNumber.bind(this)} 
                />
              </Form.Group>
              <Form.Group controlId="formBasicFirstName" as={Col} md="4">
                <Form.Label className="font-weight-bold">First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={this.addFisrtName.bind(this)} 
                />
              </Form.Group>
  
              <Form.Group controlId="formBasicLastName" as={Col} md="4">
                <Form.Label className="font-weight-bold">Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={this.addLastName.bind(this)} />
              </Form.Group>
  
              <Form.Group controlId="formBasicEmail" as={Col} md="4">
                <Form.Label className="font-weight-bold">Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.addEmail.bind(this)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
      </Form.Text>
      <Form.Text className="text-danger">
                  {this.state.emailError}
      </Form.Text>
              </Form.Group>
  
              <Form.Group controlId="formBasicIndustry" as={Col} md="4">
                <Form.Label className="font-weight-bold">Industry</Form.Label>
                <Form.Control type="text" placeholder="Enter Industry" onChange={this.addIndustry.bind(this)} />
              </Form.Group>
  
              <Form.Group as={Col} md="4">
                <Form.File id="exampleFormControlFile1" label="Profile pic" className="font-weight-bold" onChange={this.addFile.bind(this)} />
                <Form.Text className="text-danger">
                  {this.state.errorText}
      </Form.Text>
              </Form.Group>
  
              <Button variant="outline-dark"  className="ml-3" onClick={this.submitData.bind(this)}>
                Submit
    </Button>
  
            </Form>
          </div>
        </div>
  
      )
    }
  };

  export default Insert;