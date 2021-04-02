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



function jaj(){
    return (<div className="container m-5">
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
    <Tab eventKey="home" title="Home">
      <Hm />
    </Tab>
    <Tab eventKey="profile" title="Profile">
      <Pr />
    </Tab>
  </Tabs></div>)
};

function Hm(){
  const name= 'sajid';
    return (<div><h5 className="m-5">I am in Home</h5>
    </div>)
}
function Pr(){
    return (<h5>I am at Profile</h5>)
}

export default jaj;