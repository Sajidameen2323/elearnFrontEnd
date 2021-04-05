import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import {
Form,Col,Collapse
} from 'react-bootstrap';
import Axios from 'axios';



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
        profilepicName:'',
        editFirstName:false,
        editLastName:false,
        editEmail:false,
        editIndustry:false,
        firstnameError:'',
        lastnameError:'',
        imgSrc:null
  
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
          profilepicName:data[0].profilepic,
          imgSrc:`${process.env.PUBLIC_URL}/profilepics/${data[0].profilepic}`
          
        });
      });

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
          profilepicName:Date.now().toString().slice(0,9)+'-'+e.target.files[0].name,
          imgSrc: URL.createObjectURL(e.target.files[0])
        })
      } else {
        
      }
  
  
    }
    toggleEdit(e){
      let chk = e.target.getAttribute('data-edit');

      if(chk==='firstname'){
        this.setState({
        editFirstName:!this.state.editFirstName
      })
      }else if(chk==='lastname'){
        this.setState({
          editLastName:!this.state.editLastName
        })
      }else if (chk==="email"){
        this.setState({
          editEmail:!this.state.editEmail
        })
      }else if(chk==="industry"){
        this.setState({
          editIndustry:!this.state.editIndustry
        })
      }
      
    }
    submitData() {
      const data = new FormData();
      console.log(data);
      const re = /^[a-z][\w]+[.]{0,1}[\w]+[@][\w]+[.][\w]+/i;
      let chkEmail = re.test(this.state.email);
      if (this.state.firstname !== '' && this.state.lastname !== ''
        && this.state.email !== '' && this.state.industry!=='' && chkEmail) {
        data.append('file', this.state.selectedFile);
        console.log(data);
        Axios.post('http://localhost:3001/api/updateCandidate', {registrationNo:this.state.regNo,
          firstname: this.state.firstname, lastname: this.state.lastname,
          email: this.state.email, industry: this.state.industry, profilepic: this.state.profilepicName
        }).then(() => {
          alert('success');
        });
        Axios.post("http://localhost:3001/api/upload", data, {
        }).then((res) => {
          console.log(res.statusText)
        });
        alert ('Successfully Updated');
        this.setState({
          errorText:'',
          emailError:''
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
          <h5 className="pt-3">Edit Sector for candidate {this.state.regNo} </h5>

            <Form className="ml-5 mt-5">
          

              <Form.Group controlId="formBasicFirstName" as={Col} md="4">
                <Form.Label className="font-weight-bold">First Name : {this.state.firstname}</Form.Label>
                 <Button
        onClick={this.toggleEdit.bind(this)}
        aria-controls="example-collapse-text"
        aria-expanded={true}
        data-edit='firstname'
        className="btn btn-sm btn-outline-secondary"
        bsPrefix="btn-sm ml-3"
      >
        Edit
      </Button>

                      <Collapse in={this.state.editFirstName}>
      <Form.Control type="text" placeholder="Enter First Name" onChange={this.addFisrtName.bind(this)} 
                />
      </Collapse>
                 <Form.Text className="text-danger">
                  {this.state.firstnameError}
      </Form.Text>
              </Form.Group>
  
              <Form.Group controlId="formBasicLastName" as={Col} md="4">
                <Form.Label className="font-weight-bold">Last Name : {this.state.lastname}</Form.Label>

                         <Button
        onClick={this.toggleEdit.bind(this)}
        aria-controls="example-collapse-text"
        aria-expanded={true}
        data-edit='lastname'
        className="btn btn-sm btn-outline-secondary"
        bsPrefix="btn-sm ml-3"
      >
        Edit
      </Button>

                      <Collapse in={this.state.editLastName}>
     <Form.Control type="text" placeholder="Enter Last Name" onChange={this.addLastName.bind(this)} />
      </Collapse>
<Form.Text className="text-danger">
                  {this.state.lastnameError}
      </Form.Text>
                
              </Form.Group>
  
              <Form.Group controlId="formBasicEmail" as={Col} md="4">
                <Form.Label className="font-weight-bold">Email address : {this.state.email}</Form.Label>
                <Button
        onClick={this.toggleEdit.bind(this)}
        aria-controls="example-collapse-text"
        aria-expanded={true}
        data-edit='email'
        className="btn btn-sm btn-outline-secondary"
        bsPrefix="btn-sm ml-3"
      >
        Edit
      </Button>
       <Collapse in={this.state.editEmail}>
     <Form.Control type="email" placeholder="Enter email" onChange={this.addEmail.bind(this)} />

      </Collapse>         
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
      </Form.Text>
      <Form.Text className="text-danger">
                  {this.state.emailError}
      </Form.Text>
              </Form.Group>
  
              <Form.Group controlId="formBasicIndustry" as={Col} md="4">
                <Form.Label className="font-weight-bold">Industry : {this.state.industry}</Form.Label>

                <Button
        onClick={this.toggleEdit.bind(this)}
        aria-controls="example-collapse-text"
        aria-expanded={true}
        data-edit='industry'
        className="btn btn-sm btn-outline-secondary"
        bsPrefix="btn-sm ml-3"
      >
        Edit
      </Button>
 <Collapse in={this.state.editIndustry}>
     
                <Form.Control type="text" placeholder="Enter Industry" onChange={this.addIndustry.bind(this)} />
      </Collapse> 

              </Form.Group>
  
              <Form.Group as={Col} md="4">
              
                <Form.File id="exampleFormControlFile1" label={`Profile pic : ${this.state.profilepicName}`} className="font-weight-bold" onChange={this.addFile.bind(this)} />
                <img className="img-fluid mt-2"
                  src={this.state.imgSrc}
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
        </div>
  
      )
    }
  };

  export default UpdateCandidate;