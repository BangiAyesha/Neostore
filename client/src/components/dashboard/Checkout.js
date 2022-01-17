import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Dropdown,
    Form,
    Row,
} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { getUser } from "../../config/MyService";
import { useNavigate } from "react-router-dom";
import Validation from "../common/Validation";
import { addOrder } from "../../config/OrderService";
import { addCart } from "../../config/MyService";

export default function Checkout() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);
    const [address, setAddress] = useState([]);
    let token = localStorage.getItem("_token");
    let decode = jwt_decode(token);
    let email = decode.oid;
    let subtotal = JSON.parse(localStorage.getItem("subtotal"));
    let gst = JSON.parse(localStorage.getItem("gst"));
    let total = JSON.parse(localStorage.getItem("total"));
    let cart1 = JSON.parse(localStorage.getItem("mycart"));

    const formLogin = () => {
        let data = {
            email,
            total,
            subtotal,
            gst,
            values,
            selected,
            cart1,
        };
        addOrder(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.removeItem("mycart");
                localStorage.removeItem("total");
                localStorage.removeItem("gst");
                localStorage.removeItem("subtotal");
                let cart = [];
                let data = {
                    email,
                    cart,
                };
                addCart(data).then((res) => {});
                alert("Order placed Successfully");
                navigate("/");
            }
        });
    };

    const { handler, values, errors, handleSubmit } = Validation(formLogin);

    const display = (value) => {
        let deliveryAddress =
            value.address +
            "," +
            value.city +
            "- " +
            value.pincode +
            "," +
            value.state +
            "," +
            value.country;
        setSelected(deliveryAddress);
    };

    useEffect(() => {
        getUser(email).then((res) => {
            setAddress(res.data.address);
        });
    }, []);
    return (
        <div>
            <Container>
                <Row>
                    <Col md={6}>
                        <br />
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                {selected.length === 0
                                    ? "Select Address"
                                    : selected}
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                                style={{
                                    overflowY: "scroll",
                                    maxHeight: "360px",
                                }}
                            >
                                <Dropdown.Item
                                    onClick={() => navigate("/address")}
                                >
                                    Add Address
                                </Dropdown.Item>

                                {address.map((value, index) => {
                                    return (
                                        <div key={index}>
                                            <Dropdown.Item
                                                onClick={() => display(value)}
                                                className="dropdown-item"
                                            >
                                                {value.address}, {value.city} -{" "}
                                                {value.pincode} , {value.state}{" "}
                                                ,{value.country}
                                            </Dropdown.Item>
                                        </div>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <br />

                        <Col className="mt-5">
                            <Button
                                variant="success"
                                onClick={(e) => handleSubmit(e)}
                            >
                                Confirm and Buy
                            </Button>
                        </Col>
                    </Col>
                    <Col md={6}>
                        <Form.Label style={{ fontWeight: "bold" }}>
                            Credit Card Number
                        </Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter credit card details"
                            name="card"
                            onChange={handler}
                        />
                        <Form.Text>
                            {errors.card && (
                                <p
                                    style={{
                                        color: "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {errors.card}
                                </p>
                            )}
                        </Form.Text>
                        <br />
                        <Card
                            style={{
                                padding: "1rem",
                                textAlign: "center",
                                width: "20rem",
                            }}
                        >
                            <h3 style={{ textAlign: "right" }}>Total</h3>
                            <hr />
                            <h5>Subtotal :{subtotal.toFixed(2)}</h5>
                            <h5>GST (18%) :{gst.toFixed(2)}</h5>
                            <hr />
                            <h3 style={{ textAlign: "right" }}>
                                Total:
                                {total.toFixed(2)}
                            </h3>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
