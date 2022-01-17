import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Accountsidebar from "../common/Accountsidebar";
import Validation from "../common/Validation";
import { changePassword } from "../../config/MyService";
import jwt_decode from "jwt-decode";

export default function ChangePassword() {
    const [oldpassword, setOldpassword] = useState("");
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let email = decode.oid;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setOldpassword({ ...oldpassword, [name]: value });
    };

    const formLogin = () => {
        let data = {
            values,
            email,
            oldpassword,
        };
        changePassword(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else if (res.data.err === 0) {
                alert(res.data.message);
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(formLogin);
    return (
        <div>
            <Container>
                <Row>
                    <Col md={4}>
                        <Accountsidebar />
                    </Col>
                    <Col md={8}>
                        <h3>Change Password</h3>
                        <hr />
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Old Password"
                                    name="oldpassword"
                                    style={{ border: "1px solid black" }}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter New Password"
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
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-enter New Password"
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
                                    Change Password
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
