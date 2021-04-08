import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import {
 Form, Col
} from 'react-bootstrap';
import Axios from 'axios';


class Insert extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        regNo:'',
        firstname: '',
        lastname: '',
        email: '',
        industry: '',
        selectedFile: null,
        errorText:'',
        emailError:'',
        firstnameError:'',
        lastnameError:'',
        imgSrc:null
  
      }
    };
    addRegNumber(e){
      this.setState({
        regNo:e.target.value
      })
    }
    addFisrtName(e) {
      let reg = /^[a-z]+$/i;
      if (reg.test(e.target.value)){
        this.setState({
        firstname: e.target.value,
        firstnameError:''
      })
      } else{
        this.setState({
          firstnameError:'Name Cannot Contain Numbers Or Be Empty'
        })
      }

    }
    addLastName(e) {
   let reg = /^[a-z]+$/i;
      if (reg.test(e.target.value)){
        this.setState({
        lastname: e.target.value,
        lastnameError:''
      })
      } else{
        this.setState({
          lastnameError:'Name Cannot Contain Numbers Or Be Empty'
        })
      }
    }
    addEmail(e) {
      let reg = /^[a-z][\w]+[.]{0,1}[\w]+[@][\w]+[.][\w]+/i;
      if(reg.test(e.target.value)){
              this.setState({
        email: e.target.value,
        emailError:''
      })
            }else{
              this.setState({
                emailError:'Enter A Valid Email'
              })
            }

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
          loaded: 0,
          imgSrc: URL.createObjectURL(e.target.files[0])
        })
      } else {
        
      }
  
  
    }
    submitData() {
      const data = new FormData();
      console.log(data);
      const regEmail =/^[a-z][\w]+[.]{0,1}[\w]+[@][\w]+[.][\w]+/i;
      let chkEmail = regEmail.test(this.state.email);
      const regName = /^[a-zA-Z\s]+$/;
      let chkFirstName = regName.test(this.state.firstname);
      let chkLastName = regName.test(this.state.lastname);
      if (this.state.firstname !== '' && this.state.lastname !== ''
        && this.state.email !== '' && this.state.industry && this.state.selectedFile !== null && chkEmail
         && chkLastName && chkFirstName
        && this.state.regNo !== '') {
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
        });
        window.location.reload();
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
            <Form className="ml-3 mt-5">

            <Form.Group controlId="formBasicFirstName" as={Col} md="4">
                <Form.Label className="font-weight-bold">Registration Number</Form.Label>
                <Form.Control type="number" placeholder="Enter Registration Number" onChange={this.addRegNumber.bind(this)} 
                />
              </Form.Group>
              <Form.Group controlId="formBasicFirstName" as={Col} md="4">
                <Form.Label className="font-weight-bold">First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" onChange={this.addFisrtName.bind(this)} 
                />
                <Form.Text className="text-danger">
                  {this.state.firstnameError}
      </Form.Text>
              </Form.Group>
  
              <Form.Group controlId="formBasicLastName" as={Col} md="4">
                <Form.Label className="font-weight-bold">Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" onChange={this.addLastName.bind(this)} />
                <Form.Text className="text-danger">
                  {this.state.lastnameError}
      </Form.Text>

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
        <img className="img img-fluid mt-2 img-responsive"
                  src={this.state.imgSrc}
                  alt="profilepic" />
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