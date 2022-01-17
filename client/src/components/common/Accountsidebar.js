import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faPortrait,
    faAddressCard,
    faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";

export default function Accountsidebar() {
    return (
        <div className="text-center">
            <div>
                <Button variant="none" href="/orders">
                    <FontAwesomeIcon icon={faBars} />
                    &nbsp; Order
                </Button>
            </div>
            <br />
            <div>
                <Button variant="none" href="/profile">
                    <FontAwesomeIcon icon={faPortrait} />
                    &nbsp; Profile
                </Button>
            </div>

            <br />
            <div>
                <Button variant="none" href="/address">
                    <FontAwesomeIcon icon={faAddressCard} />
                    &nbsp;Address
                </Button>
            </div>

            <br />
            <div>
                <Button variant="none" href="/changepassword">
                    <FontAwesomeIcon icon={faExchangeAlt} />
                    &nbsp;Change Password
                </Button>
            </div>
        </div>
    );
}
