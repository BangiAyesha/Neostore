import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import { sendOtpPassword, verifyOtp } from "../../config/MyService";

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        otp: "",
    });

    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const sendOtp = (event) => {
        event.preventDefault();
        sendOtpPassword(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            }
        });
    };

    const checkOtp = (event) => {
        event.preventDefault();
        verifyOtp(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
                navigate("/changeforgotpassword");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            }
        });
    };

    return (
        <div>
            <br />
            <Container
                style={{
                    backgroundColor: "lightgray",
                    padding: "2rem",
                    border: "1px solid black",
                }}
            >
                <h2 className="text-center">Forgot Password</h2>
                <br />
                <Form
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
                    <div className="text-center">
                        <Button
                            variant="dark"
                            type="submit"
                            onClick={(e) => sendOtp(e)}
                        >
                            Send OTP
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            variant="dark"
                            type="submit"
                            onClick={() => navigate("/login")}
                        >
                            Back
                        </Button>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control
                            type="number"
                            name="otp"
                            placeholder="Enter OTP"
                            style={{ border: "1px solid black" }}
                            onChange={(e) => handler(e)}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button
                            variant="dark"
                            type="submit"
                            onClick={(e) => checkOtp(e)}
                        >
                            Verify OTP
                        </Button>
                        <br />
                    </div>
                </Form>
            </Container>
        </div>
    );
}
