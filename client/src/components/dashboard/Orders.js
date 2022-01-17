import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { getOrders } from "../../config/OrderService";
import Accountsidebar from "../common/Accountsidebar";
import jwt_decode from "jwt-decode";

export default function Orders() {
    const [images, setImages] = useState([]);
    const [orderdetails, setOrderdetails] = useState([]);
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

    useEffect(() => {
        getOrders(email).then((res) => {
            setOrderdetails(res.data);
            res.data.forEach((ele) => {
                setImages(ele.cart);
            });
        });
    }, []);

    return (
        <div>
            <Container>
                {orderdetails.map((value, index) => {
                    return (
                        <div
                            style={{
                                border: "1px solid black",
                                padding: "1rem",
                            }}
                            key={index}
                        >
                            {images.map((img, index) => {
                                return (
                                    <Image
                                        src={img.image}
                                        width="150px"
                                        height="150px"
                                        key={index}
                                    />
                                );
                            })}
                            <h4>Order ID: {value._id}</h4>
                            <Row>
                                <Col>
                                    <p style={{ fontWeight: "bold" }}>
                                        Date: {value.createdAt.substring(0, 10)}
                                    </p>
                                </Col>
                                <Col>
                                    <h3>Total: &#8377; {value.total}</h3>
                                </Col>
                            </Row>
                            <Button href={`/invoice/${value._id}`}>
                                View and download PDF
                            </Button>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
}
