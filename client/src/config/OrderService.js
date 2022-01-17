import axios from "axios";
import { URL } from "./Url";
let token = localStorage.getItem("_token");

export function addOrder(data) {
    return axios.post(`${URL}addorder`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function getOrders(data) {
    return axios.get(`${URL}getorders/${data}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export function getInvoicedetails(data) {
    return axios.get(`${URL}getinvoicedetails/${data}`);
}
