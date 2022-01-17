import React, { useState } from "react";
const Validation = (callback) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const regForName = /^[a-zA-Z]{2,100}$/;
    const regForCity = /^[a-zA-Z]{3,100}$/;
    const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const regForPassword = RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/
    );
    const regforContact = RegExp(/^[0-9]{10}$/);
    const regforCard = RegExp(/^[0-9]{16}$/);
    const regforAddress = RegExp(/^[a-zA-Z0-9\s,./'-]{3,}$/);
    const regforPincode = RegExp(/^\d{6}$/);

    const validate = (event, name, value) => {
        switch (name) {
            case "fname":
                errors.fname = regForName.test(value)
                    ? ""
                    : "Name must have atleast 2 characters";
                break;
            case "lname":
                errors.lname = regForName.test(value)
                    ? ""
                    : "Name must have atleast 2 characters";
                break;
            case "email":
                errors.email = regForEmail.test(value)
                    ? ""
                    : "Enter Valid Email";
                break;
            case "mobile":
                errors.mobile = regforContact.test(value)
                    ? ""
                    : "Enter valid Contact Number";
                break;
            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter and one special character";
                break;
            case "cpassword":
                errors.cpassword =
                    document.getElementById("password").value === value
                        ? ""
                        : "Password and confirm password should be same";
                break;
            case "address":
                errors.address = regforAddress.test(value)
                    ? ""
                    : "Adress must contain minimum 3 characters";
                break;
            case "pincode":
                errors.pincode = regforPincode.test(value)
                    ? ""
                    : "Pincode must be 6 digits";
                break;
            case "city":
                errors.city = regForCity.test(value)
                    ? ""
                    : "City name must be minimum 3 characters";
                break;
            case "state":
                errors.state = regForCity.test(value)
                    ? ""
                    : "State name must be minimum 3 characters";
                break;
            case "country":
                errors.country = regForCity.test(value)
                    ? ""
                    : "Country name must be minimum 3 characters";
                break;

            case "card":
                errors.card = regforCard.test(value)
                    ? ""
                    : "Card Number Should be 16 digits";
                break;

            default:
                alert("Fill proper details");
        }
    };

    const validating_error = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (values) => values.length > 0 && (valid = false)
        );
        return valid;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validating_error(errors)) {
            callback();
        } else {
            alert("There is an error");
        }
    };

    const handler = (event) => {
        event.persist();

        let name = event.target.name;
        let val = event.target.value;
        validate(event, name, val);
        setValues({
            ...values,
            [name]: val,
        });
    };

    return {
        values,
        errors,
        handler,
        handleSubmit,
    };
};

export default Validation;
