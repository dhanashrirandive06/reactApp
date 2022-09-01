import { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import './Register.css';
import TweetAppService from '../../utilities/TweetAppService';

function Register() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [contact, setContact] = useState('');
  const [emailid, setEmailid] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const errors = {
    firstname: "",
    lastname: "",
    contact: "",
    emailid: "",
    username: "",
    password: ""
  };
  const [error, setError] = useState(errors);
  const service = new TweetAppService();

  const navigate = useNavigate();
  const handleRegister = () => {

    let userdata = {
      firstname,
      lastname,
      contact,
      emailid,
      username,
      password
    };

    service.register(userdata);

    navigate('/login');

  }

  function validate() {
    let input = {

      firstname: "",
      lastname: "",
      contact: "",
      emailid: "",
      username: "",
      password: ""

    };

    let errors = {
      firstname: "",
      lastname: "",
      contact: "",
      emailid: "",
      username: "",
      password: ""
    };

    let isValid = true;

    if (!input.username) {
      isValid = false;
      errors.username = "Please enter your username.";
    }

    if (typeof input.username !== "undefined") {
      const re = /^\S*$/;
      if (input.username.length < 3 || !re.test(input.username)) {
        isValid = false;
        errors.username = "Please enter valid username.";
      }
    }
    if (!input.contact) {
      isValid = false;
      errors.contact = "Please enter your Contact number";
    }

    if (typeof input.contact !== "undefined") {

      var pattern = new RegExp(/^[0-9\b]+$/);

      if (!pattern.test(input.contact)) {

        isValid = false;

        errors.contact = "Please enter only number.";

      } else if (input.contact.length != 10) {

        isValid = false;

        errors.contact = "Please enter valid phone number.";

      }
    }

    if (!input.email) {
      isValid = false;
      errors.email = "Please enter your email Address.";
    }

    if (typeof input.email !== "undefined") {

      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input.email)) {
        isValid = false;
        errors.email = "Please enter valid email address.";
      }
    }
    if (!input.firstname) {
      isValid = false;
      errors.email = "Please enter your First name.";
    }






    if (!input.password) {
      isValid = false;
      errors.password = "Please enter your password.";
    }



    if (typeof input.password !== "undefined") {
      if (input.password.length < 6) {
        isValid = false;
        errors.password = "Please add at least 6 charachter.";
      }
    }



    setError(errors);

    return isValid;
  }





  return (
    <Container>

      <h1 className=" text-signup mt-5 p-3 text-center">Sign Up</h1>

      <Row>
        <Col lg={6} md={6} sm={12} className="registerClass p-5 m-auto  rounded-lg">
          <Form>
            <Form.Group  controlId="formBasicEmail">
              <div className="row my-3">
                <Form.Label className="col">First Name</Form.Label>
                <Form.Control required className="col" type="text" placeholder="first name" onChange={e => setFirstname(e.target.value)} />
              </div>
                <div className="text-danger">{error.firstname}</div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <div className="row my-3">
                <Form.Label className="col">Last Name</Form.Label>
                <Form.Control required className="col" type="text" placeholder="last name" onChange={e => setLastname(e.target.value)} />
              </div>
            </Form.Group>



            <Form.Group controlId="formBasicEmail">
              <div className="row my-3">
                <Form.Label className="col">Contact Number</Form.Label>
                <Form.Control required className="col" type="number" placeholder="contact number" onChange={e => setContact(e.target.value)} />
              </div>
                <div className="text-danger">{error.contact}</div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <div className="row my-3">
                <Form.Label className="col">Email ID</Form.Label>
                <Form.Control required className="col" type="text" placeholder="email id" onChange={e => setEmailid(e.target.value)} />

              </div>
              <div className="text-danger">{error.emailid}</div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <div className="row my-3">
                <Form.Label className="col">Username</Form.Label>
                <Form.Control required className="col" type="text" placeholder="username" onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="text-danger">{error.username}</div>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <div className="row my-3">
                <Form.Label className="col">Password</Form.Label>
                <Form.Control className="col" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="text-danger">{error.password}</div>
            </Form.Group>


            <div className="row my-3">
              <Button variant="success btn-block" onClick={handleRegister} type="submit">
                Sign up
              </Button>
            </div>





          </Form>
        </Col>
      </Row>
      {/*  <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2021 . All Rights Reserved.</h6>*/}
    </Container>
  )
}

export default Register