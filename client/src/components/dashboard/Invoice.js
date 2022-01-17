import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { getInvoicedetails } from "../../config/OrderService";

export default function Invoice() {
    const ref = React.createRef();
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [cart, setCart] = useState([]);
    console.log(id);
    useEffect(() => {
        getInvoicedetails(id).then((res) => {
            setDetails(res.data);
            setCart(res.data.cart);
        });
    }, []);
    console.log(details);
    const generatePdf = () => {
        const input = document.getElementById("divToPrint");
        console.log(input);
        html2canvas(input, { useCORS: true }).then((canvas) => {
            const pdf = new jsPDF();
            const img = canvas.toDataURL(
                "https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
            );
            pdf.addImage(img, "JPEG", 0, 0);
            pdf.save("download.pdf");
        });
    };
    return (
        <div>
            <div className="text-center">
                <Button variant="success" onClick={() => generatePdf()}>
                    Download PDF
                </Button>
            </div>
            <br />
            <Container
                style={{
                    border: "1px solid black",
                    padding: "1rem",
                    width: "795px",
                }}
                ref={ref}
                id="divToPrint"
            >
                <div style={{ backgroundColor: "lightgray" }}>
                    <Row>
                        <Col md={7}>
                            <div>
                                <Image
                                    src="https://image.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
                                    width="100px"
                                    height="100px"
                                />
                            </div>
                        </Col>
                        <Col md={5}>
                            <h2>Bill/Invoice</h2>
                            <p>
                                Date: {details.createdAt}
                                <br />
                                Order ID: {id}
                            </p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row>
                        <Col md={9}>
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    FROM
                                </span>
                                <br />
                                <span style={{ fontWeight: "bold" }}>
                                    NeoStore Technologies
                                </span>
                                <br />
                                neostore@neosoft.com
                                <br />
                                9876543210
                            </p>
                            <br />
                            <p>
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "gray",
                                    }}
                                >
                                    BILL TO ADDRESS
                                </span>
                                <br />

                                <span style={{ fontWeight: "bold" }}>
                                    {details.address}
                                </span>
                            </p>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Title</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.name}</td>
                                        <td>{value.quantity}</td>
                                        <td>&#8377; {value.cost}</td>
                                        <td>
                                            &#8377;{" "}
                                            {value.cost * value.quantity}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <div style={{ textAlign: "right" }}>
                    <h5>Subtotal : &#8377; {details.subtotal}</h5>
                    <h5>GST : &#8377; {details.gst}</h5>
                    <hr />
                    <h4 style={{ fontWeight: "bold" }}>
                        TOTAL
                        <br />
                        &#8377; {details.total}
                    </h4>
                </div>
                <br />
                <div className="text-center" style={{ color: "red" }}>
                    <h2>THANKYOU!!!!!</h2>
                    <h2>For Shopping With Us</h2>
                </div>
                <br />
            </Container>
        </div>
    );
}
