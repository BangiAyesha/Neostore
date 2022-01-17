import React, { useEffect, useState } from "react";
import { Form, Button, Container, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Validation from "../common/Validation";
import { postUser, sendOtpEmail } from "../../config/MyService";
import SocialLogin from "./SocialLogin";
import SocialButton from "./SocialButton";
import { socialLogin, getUser } from "../../config/MyService";

export default function Register() {
    const [otp, setOtp] = useState("");
    const formLogin = () => {
        sendOtpEmail(values).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(formLogin);
    const navigate = useNavigate();

    const onChangeUser = (event) => {
        const { name, value } = event.target;
        setOtp({ ...otp, [name]: value });
    };

    const handleSocialLogin = (user) => {
        let data = {
            fname: user._profile.firstName,
            lname: user._profile.lastName,
            email: user._profile.email,
            provider: user._provider,
        };
        socialLogin(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
                navigate("/login");
            } else {
                alert(res.data.message);
            }
        });
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    const registration = (event) => {
        event.preventDefault();
        let demo = {
            values,
            otp,
        };
        postUser(demo).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
                navigate("/login");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else {
                alert(res.data.message);
            }
        });
    };

    return (
        <div>
            <Container
                style={{
                    backgroundColor: "lightgray",
                    padding: "1rem",
                    border: "1px solid black",
                }}
            >
                <h2 className="text-center">Register Here</h2>
                <div className="text-center">
                    {/* <SocialLogin /> */}
                    <div>
                        <SocialButton
                            provider="facebook"
                            appId="302989334798085"
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                            className="btn-primary"
                        >
                            Register with Facebook
                        </SocialButton>
                        &nbsp;&nbsp;
                        <SocialButton
                            provider="google"
                            appId="1064501936748-nup9k0cldnqbe2uue2bceavriq0t0ek8.apps.googleusercontent.com"
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                            className="btn-danger"
                        >
                            Register with Gmail
                        </SocialButton>
                    </div>
                </div>
                <br />
                <Row>
                    <Col>
                        <Form
                            onSubmit={(e) => handleSubmit(e)}
                            style={{
                                border: "1px solid black",
                                padding: "1rem",
                            }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name="fname"
                                    style={{ border: "1px solid black" }}
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.fname && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.fname}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name="lname"
                                    style={{ border: "1px solid black" }}
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.lname && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.lname}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    style={{ border: "1px solid black" }}
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.email && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.email}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number"
                                    name="mobile"
                                    style={{ border: "1px solid black" }}
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.mobile && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.mobile}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    style={{ border: "1px solid black" }}
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.password && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.password}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-enter Password"
                                    name="cpassword"
                                    style={{ border: "1px solid black" }}
                                    onChange={handler}
                                />
                                <Form.Text>
                                    {errors.cpassword && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {errors.cpassword}
                                        </p>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="dark" type="submit">
                                    Send OTP for email verification
                                </Button>
                                <br />
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/login")}
                                >
                                    Already have an account? Click Here
                                </Button>
                            </div>
                        </Form>
                        <Form
                            onSubmit={(e) => registration(e)}
                            style={{
                                border: "1px solid black",
                                padding: "1rem",
                            }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter OTP"
                                    name="otp"
                                    style={{ border: "1px solid black" }}
                                    onChange={onChangeUser}
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="dark" type="submit">
                                    Verify OTP
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
