import axios from "axios";
import { URL } from "./Url";
let token = localStorage.getItem("_token");

export function getData() {
    return axios.get(`${URL}getdata`);
}

export function postUser(data) {
    return axios.post(`${URL}register`, data);
}

export function userLogin(data) {
    return axios.post(`${URL}login`, data);
}

export function getUser(data) {
    return axios.get(`${URL}getuser/${data}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function sendOtpEmail(data) {
    return axios.post(`${URL}sendotpemail`, data);
}

export function sendOtpPassword(data) {
    return axios.post(`${URL}sendotppassword`, data);
}

export function verifyOtp(data) {
    return axios.post(`${URL}verifyotp`, data);
}

export function changeForgotPasswrd(data) {
    return axios.post(`${URL}changeforgotpassword`, data);
}

export function updateData(data) {
    return axios.put(`${URL}updatedata/${data.email}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function changePassword(data) {
    return axios.put(`${URL}changepassword/${data.email}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function addAddress(data) {
    return axios.put(`${URL}addaddress/${data.email}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function addCart(data) {
    return axios.put(`${URL}addtocart/${data.email}`, data);
}

export function socialLogin(data) {
    return axios.post(`${URL}register1`, data);
}

export function loginUsingSocial(data) {
    return axios.post(`${URL}login1`, data);
}
