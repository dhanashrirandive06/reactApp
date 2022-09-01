import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utilities/Auth';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import './Login.css';
import logo from '../../asset/twitterLogo.png';
import TweetAppService from '../../utilities/TweetAppService';

export function Login() {
    const errors = { username: "", password: "" };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(errors);
    const auth = useAuth();
    const navigate = useNavigate();
    const service = new TweetAppService();

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()) {
            service.login(username, password);
            auth.login(username);
            navigate('/');
        }
    }

    function validate() {
        let input = {
            username,
            password
        };
        let errors = {
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
            if (input["username"].length < 3 || !re.test(input["username"])) {
                isValid = false;
                errors.username = "Please enter valid username.";
            }
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
    const handleLogin = (e) => {
        e.preventDefault();
        service.login(username, password);
        auth.login(username);
        navigate('/');
    }

    return (
        <div>
            <Container>
                <div className="logo"><img src={logo} width="200" height="50" className="App-logo my-5"></img></div>
                <Row className="">
                    <Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg border">
                        <Form>
                            <Form.Group controlId="formBasicEmail" >
                                <div className="row rowClass">
                                    <div className="col"> <Form.Label >Username</Form.Label></div>
                                    <div className="col" > <Form.Control type="text" placeholder="username" onChange={e => setUsername(e.target.value)} /></div>
                                </div>
                                <div className="text-danger">{error.username}</div>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" >
                                <div className="row rowClass">
                                    <div className="col"> <Form.Label >Password</Form.Label></div>
                                    <div className="col"><Form.Control  type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} /></div>
                                </div>
                               
                                
                                <div className="text-danger">{error.password}</div>
                            </Form.Group>

                         <div className="my-3">
                                <a href="/forgotpassword" className=" forgotpass-text">Forgot password?</a>
                            </div>
                            <Button type="submit" variant="success btn-block" onClick={handleSubmit} >
                                Login
                            </Button>
                            <div className="text-center mt-4">
                                <p className='register-text'>Not a member? <a href="/signup">Register</a></p>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
