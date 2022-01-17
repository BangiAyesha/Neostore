import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function Footer1() {
    return (
        <div>
            <footer>
                <div className="text-center bg-dark text-light">
                    <Row>
                        <Col md={4}>
                            <h4>About Company</h4>
                            <p style={{ fontSize: "small" }}>
                                NeoSOFT Technologies is here at your quick and
                                easy service for shopping
                                <br />
                                Contact Information
                                <br />
                                Email: contact@neosofttech.com
                                <br />
                                Phone: +91 0000000000
                                <br />
                                MUMBAI, INDIA
                            </p>
                        </Col>
                        <Col md={4}>
                            <h4>Information</h4>
                            <p style={{ fontSize: "small" }}>
                                <a
                                    href="/pdf/terms_conditions.pdf"
                                    target="_blank"
                                >
                                    Terms and conditions
                                </a>
                                <br />
                                Guarantee and Return Policy
                                <br />
                                Contact Us
                                <br />
                                Privacy Policy
                                <br />
                                <a
                                    href="https://www.google.com/maps/place/NeoSOFT+Technologies/@18.5790021,73.7387793,15z/data=!4m5!3m4!1s0x0:0x316090d140dfd0b3!8m2!3d18.579388!4d73.7388023"
                                    target="_blank"
                                >
                                    Locate Us
                                </a>
                            </p>
                        </Col>
                        <Col md={4}>
                            <h4>Newsletter</h4>
                            <p style={{ fontSize: "small" }}>
                                SignUp to get exclusive offer from our favorite
                                brands and to be well up in the news
                            </p>
                            <input
                                placeholder="Your email..."
                                style={{ fontSize: "small" }}
                            />
                            <br />
                            <Button variant="light" size="sm">
                                Subscribe
                            </Button>
                        </Col>
                    </Row>
                    <p style={{ fontSize: "small" }}>
                        Copyright 2022 | NeoSOFT Technologies | All rights
                        reserved | Design By Ayesha Bangi
                    </p>
                </div>
            </footer>
        </div>
    );
}
