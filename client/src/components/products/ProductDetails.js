import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Tab, Tabs } from "react-bootstrap";
import {
    getProductDetails,
    getColorDetails,
} from "../../config/ProductService";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from "react-image-magnify";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import jwt_decode from "jwt-decode";

export default function ProductDetails() {
    const [product, setProduct] = useState([]);
    const [color, setColor] = useState("");
    const [subimage, setSubimage] = useState([]);
    const [mainimage, setMainimage] = useState("");
    const { id } = useParams();
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

    const addProduct = (value) => {
        let item = {
            name: value.product_name,
            image: value.product_image,
            cost: value.product_cost,
            _id: value._id,
            quantity: 1,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            let idArrays = [];
            if (arr !== null) {
                arr.forEach((data) => {
                    idArrays.push(data._id);
                });
            }

            if (idArrays.includes(value._id)) {
                alert("Product Already Added");
            } else {
                arr.push(item);
                localStorage.setItem("mycart", JSON.stringify(arr));
                alert("Product Added to Cart");
            }
        } else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
        }
    };

    useEffect(() => {
        getProductDetails(id).then((res) => {
            setProduct([res.data]);
            setSubimage(res.data.subimages);
            setMainimage(res.data.product_image);
            getColorDetails(res.data.color_id).then((res) => {
                setColor(res.data.color_code);
            });
        });
    }, []);

    return (
        <div>
            <Container>
                {product.map((value, index) => {
                    return (
                        <div key={index}>
                            <Row key={index}>
                                <Col>
                                    <ReactImageMagnify
                                        {...{
                                            smallImage: {
                                                alt: `${value.product_name}`,
                                                isFluidWidth: true,
                                                src: mainimage,
                                            },
                                            largeImage: {
                                                src: mainimage,
                                                width: 1200,
                                                height: 1200,
                                            },
                                        }}
                                    />
                                    <br />
                                    {subimage.map((value, index) => {
                                        return (
                                            <a
                                                onClick={() =>
                                                    setMainimage(value)
                                                }
                                                key={index}
                                            >
                                                <Image
                                                    width="100px"
                                                    height="100px"
                                                    src={value}
                                                    style={{
                                                        border: "1px solid black",
                                                    }}
                                                />
                                                &nbsp;&nbsp;
                                            </a>
                                        );
                                    })}
                                </Col>
                                <Col>
                                    <h4>{value.product_name}</h4>
                                    <ReactStars
                                        count={5}
                                        isHalf={true}
                                        edit={false}
                                        value={value.product_rating}
                                        size={24}
                                        activeColor="#ffd700"
                                    />
                                    <hr />
                                    <p style={{ fontWeight: "bold" }}>
                                        Price:
                                        <span style={{ color: "green" }}>
                                            {" "}
                                            &#8377;{value.product_cost}
                                        </span>
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>
                                        Color:
                                        <svg height={20} width={20}>
                                            <rect
                                                width={20}
                                                height={20}
                                                style={{ fill: `${color}` }}
                                            />
                                        </svg>
                                    </p>
                                    <div style={{ fontWeight: "bold" }}>
                                        SHARE
                                    </div>
                                    <div>
                                        <br />
                                        <FacebookShareButton
                                            url="https://www.amazon.in/"
                                            title={
                                                "Checkout " + value.product_name
                                            }
                                            hashtag="#react"
                                        >
                                            <FacebookIcon
                                                logofillcolor="white"
                                                round={true}
                                            ></FacebookIcon>
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url="https://www.amazon.in/"
                                            title={
                                                "Checkout " + value.product_name
                                            }
                                            hashtag="#react"
                                        >
                                            <WhatsappIcon
                                                logofillcolor="white"
                                                round={true}
                                            ></WhatsappIcon>
                                        </WhatsappShareButton>
                                        <TwitterShareButton
                                            url="https://www.amazon.in/"
                                            title={
                                                "Checkout " + value.product_name
                                            }
                                            hashtag="#react"
                                        >
                                            <TwitterIcon
                                                logofillcolor="white"
                                                round={true}
                                            ></TwitterIcon>
                                        </TwitterShareButton>
                                    </div>
                                    <br />
                                    <div>
                                        <Button
                                            onClick={() => addProduct(value)}
                                        >
                                            ADD TO CART
                                        </Button>
                                        &nbsp;&nbsp;
                                        <Button
                                            style={{
                                                backgroundColor: "brown",
                                                border: "1px solid brown",
                                            }}
                                        >
                                            RATE PRODUCT
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <br />
                            <Container
                                style={{ fontWeight: "bold" }}
                                key={value._id}
                            >
                                <Tabs
                                    defaultActiveKey="home"
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3"
                                >
                                    <Tab eventKey="home" title="Description">
                                        {value.product_desc}
                                    </Tab>
                                    <Tab eventKey="profile" title="Features">
                                        <Row style={{ textAlign: "left" }}>
                                            <Col md={4}>
                                                Product Producer
                                                <hr />
                                                Product Dimension
                                                <hr />
                                                Product Material
                                            </Col>
                                            <Col>
                                                {value.product_producer}
                                                <hr />
                                                {value.product_dimension}
                                                <hr />
                                                {value.product_material}
                                            </Col>
                                        </Row>
                                    </Tab>
                                </Tabs>
                            </Container>
                        </div>
                    );
                })}
            </Container>
        </div>
    );
}
