import React, { useEffect, useState } from "react";
import {
    Container,
    Navbar,
    Nav,
    Form,
    Button,
    NavDropdown,
    FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCart } from "../../config/MyService";
import jwt_decode from "jwt-decode";

export default function Header1() {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const [len, setLen] = useState(0);
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
    const cart = JSON.parse(localStorage.getItem("mycart"));

    useEffect(() => {
        setInterval(() => {
            let token = localStorage.getItem("_token");
            if (token !== null) {
                setIsLogin(true);
            }
            let cartItems = JSON.parse(localStorage.getItem("mycart"));
            if (cartItems) {
                setLen(cartItems.length);
                // console.log("timeout");
            } else {
                setLen(0);
            }
        }, 500);
    }, []);

    const logout = () => {
        let data = {
            email,
            cart,
        };
        addCart(data).then((res) => {});
        localStorage.clear();
        navigate("/login");
        setIsLogin(false);
    };
    return (
        <div>
            <header>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Container fluid>
                        <Navbar.Brand href="/" style={{ fontWeight: "bold" }}>
                            Neo<span style={{ color: "red" }}>STORE</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: "100px" }}
                                navbarScroll
                            >
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/products">Products</Nav.Link>
                                <Nav.Link href="/orders">Order</Nav.Link>
                                <Nav.Link href="/cart">Cart ({len})</Nav.Link>
                                {isLogin == true ? (
                                    <NavDropdown
                                        title="Dropdown"
                                        id="navbarScrollingDropdown"
                                    >
                                        <NavDropdown.Item href="/profile">
                                            PROFILE
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => logout()}
                                        >
                                            LOGOUT
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <NavDropdown
                                        title="Dropdown"
                                        id="navbarScrollingDropdown"
                                    >
                                        <NavDropdown.Item href="/login">
                                            LOGIN
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="/register">
                                            REGISTER
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                )}
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">
                                    Search
                                </Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </div>
    );
}
