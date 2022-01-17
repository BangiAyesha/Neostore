import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Validation from "../common/Validation";
import { changeForgotPasswrd } from "../../config/MyService";

export default function ChangeForgotPassword() {
    const formLogin = () => {
        changeForgotPasswrd(values).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
                navigate("/login");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(formLogin);
    const navigate = useNavigate();

    return (
        <div>
            <Container
                style={{
                    backgroundColor: "lightgray",
                    padding: "2rem",
                    border: "1px solid black",
                }}
            >
                <h2 className="text-center">Register Here</h2>
                <br />
                <Form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{
                        border: "1px solid black",
                        padding: "1rem",
                    }}
                >
                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
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
                        <Form.Label>Confirm New Password</Form.Label>
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
                            Change Password
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="link"
                            onClick={() => navigate("/login")}
                        >
                            Back
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}
