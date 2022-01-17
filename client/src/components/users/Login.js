import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../config/MyService";
import SocialLogin from "./SocialLogin";
import SocialButton from "./SocialButton";
import { getUser, loginUsingSocial } from "../../config/MyService";
import jwt_decode from "jwt-decode";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    let token =
        localStorage.getItem("_token") !== undefined
            ? localStorage.getItem("_token")
            : "";
    let decode;
    let email;
    if (token !== null) {
        decode = jwt_decode(token);
        email = decode.oid;
    }

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const handleSocialLogin = (user) => {
        loginUsingSocial(user).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
                localStorage.setItem("_token", res.data.token);
                navigate("/");
                if (localStorage.getItem("_token")) {
                    let token = localStorage.getItem("_token");
                    let decode = jwt_decode(token);
                    let email = decode.oid;
                    getUser(email).then((res) => {
                        if (localStorage.getItem("mycart")) {
                            const products = JSON.parse(
                                localStorage.getItem("mycart")
                            );
                            const abc = res.data.cart;
                            const xyz = products.concat(abc);
                            const uniqueIds = [];

                            const unique = xyz.filter((element) => {
                                const isDuplicate = uniqueIds.includes(
                                    element._id
                                );

                                if (!isDuplicate) {
                                    uniqueIds.push(element._id);

                                    return true;
                                }
                            });
                            localStorage.setItem(
                                "mycart",
                                JSON.stringify(unique)
                            );
                        } else if (res.data.cart === null) {
                            localStorage.setItem("mycart", JSON.stringify([]));
                        } else {
                            localStorage.setItem(
                                "mycart",
                                JSON.stringify(res.data.cart)
                            );
                        }
                    });
                }
            } else {
                alert(res.data.message);
                navigate("/login");
            }
        });
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    const loginUser = (event) => {
        event.preventDefault();
        userLogin(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("_token", res.data.token);
                alert(res.data.message);
                navigate("/");
                if (localStorage.getItem("_token")) {
                    let token = localStorage.getItem("_token");
                    let decode = jwt_decode(token);
                    let email = decode.oid;
                    getUser(email).then((res) => {
                        if (localStorage.getItem("mycart")) {
                            const products = JSON.parse(
                                localStorage.getItem("mycart")
                            );
                            const abc = res.data.cart;
                            const xyz = products.concat(abc);
                            const uniqueIds = [];

                            const unique = xyz.filter((element) => {
                                const isDuplicate = uniqueIds.includes(
                                    element._id
                                );

                                if (!isDuplicate) {
                                    uniqueIds.push(element._id);

                                    return true;
                                }
                            });
                            localStorage.setItem(
                                "mycart",
                                JSON.stringify(unique)
                            );
                        } else if (res.data.cart === null) {
                            localStorage.setItem("mycart", JSON.stringify([]));
                        } else {
                            localStorage.setItem(
                                "mycart",
                                JSON.stringify(res.data.cart)
                            );
                        }
                    });
                }
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else if (res.data.err === 0) {
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
                <h2 className="text-center">Login Here</h2>
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
                            Login with Facebook
                        </SocialButton>
                        &nbsp;&nbsp;
                        <SocialButton
                            provider="google"
                            appId="1064501936748-nup9k0cldnqbe2uue2bceavriq0t0ek8.apps.googleusercontent.com"
                            onLoginSuccess={handleSocialLogin}
                            onLoginFailure={handleSocialLoginFailure}
                            className="btn-danger"
                        >
                            Login with Gmail
                        </SocialButton>
                    </div>
                </div>
                <br />
                <Row>
                    <Col>
                        <Form
                            onSubmit={(e) => loginUser(e)}
                            style={{
                                border: "1px solid black",
                                padding: "1rem",
                            }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    style={{ border: "1px solid black" }}
                                    onChange={(e) => handler(e)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    style={{ border: "1px solid black" }}
                                    onChange={(e) => handler(e)}
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                                <br />
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/register")}
                                >
                                    Don't have an account? Click Here
                                </Button>
                                <br />
                                <Button
                                    variant="link"
                                    onClick={() => navigate("/forgotpassword")}
                                >
                                    Forgot Password?
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
