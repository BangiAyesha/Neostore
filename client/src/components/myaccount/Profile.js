import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Accountsidebar from "../common/Accountsidebar";
import { getUser, updateData } from "../../config/MyService";
import Validation from "../common/Validation";
import jwt_decode from "jwt-decode";

export default function Profile() {
    const [user, setUser] = useState([]);
    const [isRead, setIsRead] = useState(true);
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    const email = decode.oid;

    const formLogin = () => {
        let data = {
            values,
            email,
        };
        updateData(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            }
        });
        setIsRead(true);
    };

    const { handler, values, errors, handleSubmit } = Validation(formLogin);

    useEffect(() => {
        getUser(email).then((res) => {
            setUser(res.data);
        });
    }, []);

    const isEdit = (event) => {
        event.preventDefault();
        setIsRead(false);
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col md={4}>
                        <Accountsidebar />
                    </Col>
                    <Col md={8}>
                        <h3>Profile</h3>
                        <hr />
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fname"
                                    placeholder="Enter first name"
                                    defaultValue={user.fname}
                                    readOnly={isRead}
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
                                    name="lname"
                                    defaultValue={user.lname}
                                    readOnly={isRead}
                                    placeholder="Enter last name"
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
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    defaultValue={user.email}
                                    readOnly={true}
                                    placeholder="Enter last name"
                                />
                                <Form.Text>Email cannot be changed</Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="mobile"
                                    defaultValue={user.mobile}
                                    readOnly={isRead}
                                    placeholder="Enter mobile number"
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
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => isEdit(e)}
                            >
                                Edit Details
                            </Button>
                            &nbsp;&nbsp;
                            <Button
                                variant="primary"
                                type="submit"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
