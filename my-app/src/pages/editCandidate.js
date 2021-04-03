import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem, Form, FormControl, Col, Row, ToggleButtonGroup
  , ToggleButton, Alert
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";


class UpdateCandidate extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        regNo:window.location.pathname.split('/')[2],
        firstname: '',
        lastname: '',
        email: '',
        industry: '',
        selectedFile: null,
        errorText:'',
        emailError:'',
        profilepicName:''
  
      }
    };
    componentDidMount(){
      Axios.get('http://localhost:3001/api/editCandidate/'+this.state.regNo).then((res)=>{
        let data = res.data;
        this.setState({
          firstname:data[0].firstname,
          lastname:data[0].lastname,
          email:data[0].email,
          industry:data[0].industry,
          profilepicName:data[0].profilepic
        })
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
          <div className="container mt-5">
          <h5 className="pt-3">Edit Sector for candidate {this.state.regNo}   <FontAwesomeIcon icon="coffee" /></h5>

            <Form className="ml-5 mt-5">
          

              <Form.Group controlId="formBasicFirstName" as={Col} md="4">
                <Form.Label className="font-weight-bold">First Name : {this.state.firstname}</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={this.addFisrtName.bind(this)} 
                />
              </Form.Group>
  
              <Form.Group controlId="formBasicLastName" as={Col} md="4">
                <Form.Label className="font-weight-bold">Last Name : {this.state.lastname}</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={this.addLastName.bind(this)} />
              </Form.Group>
  
              <Form.Group controlId="formBasicEmail" as={Col} md="4">
                <Form.Label className="font-weight-bold">Email address : {this.state.email}</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={this.addEmail.bind(this)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
      </Form.Text>
      <Form.Text className="text-danger">
                  {this.state.emailError}
      </Form.Text>
              </Form.Group>
  
              <Form.Group controlId="formBasicIndustry" as={Col} md="4">
                <Form.Label className="font-weight-bold">Industry : {this.state.industry}</Form.Label>
                <Form.Control type="text" placeholder="Enter Industry" onChange={this.addIndustry.bind(this)} />
              </Form.Group>
  
              <Form.Group as={Col} md="4">
              
                <Form.File id="exampleFormControlFile1" label={`Profile pic : ${this.state.profilepicName}`} className="font-weight-bold" onChange={this.addFile.bind(this)} />
                <img className="img-fluid mt-2"
                  src={`${process.env.PUBLIC_URL}/profilepics/${this.state.profilepicName}`}
                  alt="logo" />
                <Form.Text className="text-danger">
                  {this.state.errorText}
      </Form.Text>
              </Form.Group>
  
              <Button variant="outline-dark"  className="ml-3" onClick={this.submitData.bind(this)}>
                Update
    </Button>
  
            </Form>
          </div>
          <FontAwesomeIcon icon={["fab", "github"]} />
        </div>
  
      )
    }
  };

  export default UpdateCandidate;