import React from "react";
import { Carousel } from "react-bootstrap";

export default function Home() {
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/Images/Sofa/sofa_blue1.jpg"
                        alt="First slide"
                        height="450px"
                    />
                    <Carousel.Caption>
                        <h3>Amazing Offers</h3>
                        <p>Get Amazing Offers On All Products</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/Images/Chair/chair_1.jpg"
                        alt="Second slide"
                        height="450px"
                    />

                    <Carousel.Caption style={{ color: "black" }}>
                        <h3>Amazing Offers</h3>
                        <p>Get Amazing Offers On All Products</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="/Images/Cupboard/cupboard_1.jpg"
                        alt="Third slide"
                        height="450px"
                    />

                    <Carousel.Caption>
                        <h3>Amazing Offers</h3>
                        <p>Get Amazing Offers On All Products</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}
