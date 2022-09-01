import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utilities/Auth';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './Forgotpassword.css';

function Forgotpassword() {
    const [emailid,setEmailid] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/login');
    }

    return (
        <div>
            
            <Container>
            <h1 className=" text-forgot mt-5 p-3 text-center ">Forgot Password</h1>
                <Row className="">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto forgotClass rounded-lg">
                        <Form>
                        
                            <Form.Group controlId="formBasicEmail">
                            <div className="row my-3">
                                <Form.Label className="col">Email ID</Form.Label>
                                <Form.Control className="col" type="text" placeholder="email id" onChange={e=>setEmailid(e.target.value)} />
                            </div>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                            <div className="row my-3">
                                <Form.Label className="col">New Password</Form.Label>
                                <Form.Control className="col" type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
                            </div>
                            </Form.Group>

                            
                            
  
                            <div className="row my-3">
                            <Button variant="success btn-block" onClick={handleSubmit} type="submit">
                                Submit
                            </Button>
                            </div>

                            

                            

                              </Form>
                    </Col>
                </Row>
                <h6 className="mt-5 p-5 text-center text-secondary ">Copyright © 2021 . All Rights Reserved.</h6>
            </Container>
        </div>
    )
}

export default Forgotpassword;