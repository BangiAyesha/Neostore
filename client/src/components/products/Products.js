import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Row } from "react-bootstrap";
import {
    getProducts,
    getCategories,
    getColor,
    sortRating,
    sortPriceAsc,
    sortPriceDesc,
} from "../../config/ProductService";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLongArrowAltUp,
    faLongArrowAltDown,
    faStar,
    faRupeeSign,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

export default function Products() {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [color, setColor] = useState([]);

    const [pagenumber, setPagenumber] = useState(0);
    const productsPerPage = 3;
    const pageVisited = pagenumber * productsPerPage;
    const pageCount = Math.ceil(items.length / productsPerPage);

    useEffect(() => {
        getProducts().then((res) => {
            setItems(res.data);
        });
        getCategories().then((res) => {
            setCategory(res.data);
        });
        getColor().then((res) => {
            setColor(res.data);
        });
    }, []);

    const getAllProducts = () => {
        getProducts().then((res) => {
            setItems(res.data);
        });
    };

    const filterCategory = (id) => {
        getProducts().then((res) => {
            const filteredCategory = res.data.filter((items) => {
                return items.category_id === id;
            });
            setItems(filteredCategory);
        });
    };

    const filterColor = (id) => {
        getProducts().then((res) => {
            const filteredColor = res.data.filter((items) => {
                return items.color_id === id;
            });
            setItems(filteredColor);
        });
    };

    const ratingSort = () => {
        sortRating().then((res) => {
            setItems(res.data);
        });
    };

    const priceSortAsc = () => {
        sortPriceAsc().then((res) => {
            setItems(res.data);
        });
    };

    const priceSortDesc = () => {
        sortPriceDesc().then((res) => {
            setItems(res.data);
        });
    };

    const handlePageClick = ({ selected }) => {
        setPagenumber(selected);
    };

    const displayProducts = items
        .slice(pageVisited, pageVisited + productsPerPage)
        .map((value, index) => {
            return (
                <Card
                    style={{
                        width: "15rem",
                        margin: "10px",
                    }}
                    key={value._id}
                >
                    <a href={`/productdetails/${value._id}`}>
                        <Card.Img
                            variant="top"
                            src={value.product_image}
                            height="250px"
                        />
                    </a>
                    <Card.Body>
                        <Card.Title>
                            <a href={`/productdetails/${value._id}`}>
                                {value.product_name}
                            </a>
                        </Card.Title>

                        <Card.Text>
                            &#8377;
                            {value.product_cost}
                        </Card.Text>
                        <div
                            style={{
                                marginLeft: "2.5rem",
                            }}
                        >
                            <ReactStars
                                count={5}
                                isHalf={true}
                                edit={false}
                                value={value.product_rating}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                    </Card.Body>
                </Card>
            );
        });

    return (
        <div>
            <Container>
                <Row>
                    <Col md={2}>
                        <Button
                            variant="dark"
                            style={{ width: "120px" }}
                            onClick={() => getAllProducts()}
                        >
                            All Products
                        </Button>
                        <br />
                        <br />
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ width: "120px" }}
                                variant="dark"
                                id="dropdown-basic"
                            >
                                Categories
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {category.map((value, index) => {
                                    return (
                                        <Dropdown.Item
                                            onClick={() =>
                                                filterCategory(value._id)
                                            }
                                            key={index}
                                        >
                                            {value.category_name}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <br />
                        <Dropdown>
                            <Dropdown.Toggle
                                style={{ width: "120px" }}
                                variant="dark"
                                id="dropdown-basic"
                            >
                                Color
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {color.map((value, index) => {
                                    return (
                                        <Dropdown.Item
                                            onClick={() =>
                                                filterColor(value._id)
                                            }
                                            key={index}
                                        >
                                            {value.color_name}
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <div style={{ textAlign: "right" }}>
                            <span style={{ fontWeight: "bold" }}>Sort By:</span>
                            &nbsp;&nbsp;
                            <a onClick={() => ratingSort()}>
                                <FontAwesomeIcon icon={faStar} />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a onClick={() => priceSortAsc()}>
                                <FontAwesomeIcon icon={faLongArrowAltUp} />
                                <FontAwesomeIcon size="xs" icon={faRupeeSign} />
                            </a>
                            &nbsp;&nbsp;&nbsp;
                            <a onClick={() => priceSortDesc()}>
                                <FontAwesomeIcon icon={faLongArrowAltDown} />
                                <FontAwesomeIcon size="xs" icon={faRupeeSign} />
                            </a>
                        </div>
                        <br />
                        <div>
                            <Row
                                style={{ justifyContent: "center" }}
                                className="text-center"
                            >
                                {displayProducts}
                                {/* {items !== null ? (
                                    items.map((value, index) => {
                                        return (
                                            <Card
                                                style={{
                                                    width: "15rem",
                                                    margin: "10px",
                                                }}
                                                key={value._id}
                                            >
                                                <a
                                                    href={`/productdetails/${value._id}`}
                                                >
                                                    <Card.Img
                                                        variant="top"
                                                        src={
                                                            value.product_image
                                                        }
                                                        height="250px"
                                                    />
                                                </a>
                                                <Card.Body>
                                                    <Card.Title>
                                                        <a
                                                            href={`/productdetails/${value._id}`}
                                                        >
                                                            {value.product_name}
                                                        </a>
                                                    </Card.Title>
                                                    <Card.Text>
                                                        &#8377;
                                                        {value.product_cost}
                                                    </Card.Text>
                                                    <div
                                                        style={{
                                                            marginLeft:
                                                                "2.5rem",
                                                        }}
                                                    >
                                                        <ReactStars
                                                            count={5}
                                                            isHalf={true}
                                                            edit={false}
                                                            value={
                                                                value.product_rating
                                                            }
                                                            size={24}
                                                            activeColor="#ffd700"
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        );
                                    })
                                ) : (
                                    <p>No Products Found</p>
                                )} */}
                            </Row>
                            <br />
                        </div>
                    </Col>
                    <ReactPaginate
                        breakLabel="..."
                        previousLabel={"< prev"}
                        nextLabel={"next >"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        // pageRangeDisplayed={2}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disbaledClassName={"paginationDisabled"}
                        activeClass
                        // renderOnZeroPageCount={null}
                    />
                </Row>
            </Container>
        </div>
    );
}
