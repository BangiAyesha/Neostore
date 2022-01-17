import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Image,
    Row,
} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    let total = [0];
    const [cart, setCart] = useState([]);
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
    let amount;
    let gst;
    let grandtotal;

    const onAdd = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            cart.forEach((item) => {
                if (item._id === product._id) {
                    item.quantity = item.quantity + 1;
                }
            });
            setCart([...cart]);
            localStorage.setItem("mycart", JSON.stringify(cart));
        } else {
            cart.push(product);
            setCart([...cart]);
        }
    };

    const onRemove = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist.quantity === 1) {
        } else {
            cart.forEach((item) => {
                if (item._id === product._id) {
                    item.quantity = item.quantity - 1;
                }
            });
            setCart([...cart]);
            localStorage.setItem("mycart", JSON.stringify(cart));
        }
    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
    };

    const proceed = () => {
        if (token !== null) {
            localStorage.setItem("subtotal", amount);
            localStorage.setItem("gst", gst);
            localStorage.setItem("total", grandtotal);
            navigate("/checkout");
        } else {
            alert("Login to buy");
            navigate("/login");
        }
    };

    useEffect(() => {
        let cart1 = JSON.parse(localStorage.getItem("mycart"));
        setCart(cart1);
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col md={8}>
                        {cart ? (
                            cart.map((value, index) => {
                                return (
                                    <div
                                        style={{
                                            border: "1px solid black",
                                            padding: "1rem",
                                        }}
                                        key={index}
                                    >
                                        <Row>
                                            <Col md={4}>
                                                <Image
                                                    src={value.image}
                                                    width="150px"
                                                    height="150px"
                                                />
                                            </Col>
                                            <Col md={7}>
                                                <h2>{value.name}</h2>
                                                <Row>
                                                    <Col md={4}>
                                                        <p>
                                                            Price: {value.cost}
                                                        </p>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Row>
                                                            <Col>
                                                                <Button
                                                                    variant="dark"
                                                                    onClick={() =>
                                                                        onRemove(
                                                                            value
                                                                        )
                                                                    }
                                                                >
                                                                    -
                                                                </Button>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    placeholder="Enter quantity"
                                                                    min="1"
                                                                    max="20"
                                                                    value={
                                                                        value.quantity
                                                                    }
                                                                    readOnly={
                                                                        true
                                                                    }
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Button
                                                                    variant="dark"
                                                                    onClick={() =>
                                                                        onAdd(
                                                                            value
                                                                        )
                                                                    }
                                                                >
                                                                    +
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Col>
                                                        <Button
                                                            size="sm"
                                                            variant="danger"
                                                            onClick={() =>
                                                                onDelete(index)
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Col>
                                                    <Col>
                                                        <p
                                                            style={{
                                                                fontWeight:
                                                                    "bold",
                                                            }}
                                                        >
                                                            Total:
                                                            {value.cost *
                                                                value.quantity}
                                                            {console.log(
                                                                total.push(
                                                                    value.cost *
                                                                        value.quantity
                                                                )
                                                            )}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })
                        ) : (
                            <h1>Cart Empty</h1>
                        )}
                    </Col>
                    <Col md={4}>
                        <Card style={{ padding: "1rem", textAlign: "center" }}>
                            <h3 style={{ textAlign: "right" }}>Total</h3>
                            <hr />
                            <h5>
                                Subtotal :
                                {(amount = total.reduce(
                                    (result, number) => result + number
                                )).toFixed(2)}
                            </h5>
                            <h5>
                                {" "}
                                GST (18%) :{" "}
                                {(gst = (amount * 18) / 100).toFixed(2)}
                            </h5>
                            <hr />
                            <h3 style={{ textAlign: "right" }}>
                                Total:{" "}
                                {(grandtotal = (amount + gst).toFixed(2))}{" "}
                            </h3>
                            <Button onClick={() => proceed()}>
                                Proceed to buy
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
