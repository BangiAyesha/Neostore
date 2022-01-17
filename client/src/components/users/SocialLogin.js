import React, { useState } from "react";
import { socialLogin, getUser } from "../../config/MyService";
import SocialButton from "./SocialButton";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function SocialLogin() {
    const navigate = useNavigate();

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

    const handleSocialLogin = (user) => {
        let data = {
            fname: user._profile.firstName,
            lname: user._profile.lastName,
            email: user._profile.email,
            provider: user._provider,
        };
        socialLogin(data).then((res) => {
            if (res.data.flag === 1) {
                alert(res.data.message);
                localStorage.setItem("_token", res.data.token);
                navigate("/");
                if (localStorage.getItem("_token")) {
                    let token = localStorage.getItem("_token");
                    let decode = jwt_decode(token);
                    let email = decode.oid;
                    getUser(email).then((res) => {
                        if (localStorage.getItem("mycart")) {
                            const products = JSON.parse(
                                localStorage.getItem("mycart")
                            );
                            const abc = res.data.cart;
                            const xyz = products.concat(abc);
                            const uniqueIds = [];

                            const unique = xyz.filter((element) => {
                                const isDuplicate = uniqueIds.includes(
                                    element._id
                                );

                                if (!isDuplicate) {
                                    uniqueIds.push(element._id);

                                    return true;
                                }
                            });
                            localStorage.setItem(
                                "mycart",
                                JSON.stringify(unique)
                            );
                        } else if (res.data.cart === null) {
                            localStorage.setItem("mycart", JSON.stringify([]));
                        } else {
                            localStorage.setItem(
                                "mycart",
                                JSON.stringify(res.data.cart)
                            );
                        }
                    });
                }
            } else {
                alert(res.data.message);
                navigate("/login");
            }
        });
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err);
    };

    return (
        <>
            <div>
                <SocialButton
                    provider="facebook"
                    appId="302989334798085"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    className="btn-primary"
                >
                    Login with Facebook
                </SocialButton>
                &nbsp;&nbsp;
                <SocialButton
                    provider="google"
                    appId="1064501936748-nup9k0cldnqbe2uue2bceavriq0t0ek8.apps.googleusercontent.com"
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    className="btn-danger"
                >
                    Login with Gmail
                </SocialButton>
            </div>
        </>
    );
}
