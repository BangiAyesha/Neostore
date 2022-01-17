import axios from "axios";
import { URL } from "./Url";

export function getProducts() {
    return axios.get(`${URL}getproducts`);
}

export function getProductDetails(id) {
    return axios.get(`${URL}getproductdetails/${id}`);
}

export function getColor() {
    return axios.get(`${URL}getcolor`);
}

export function getColorDetails(id) {
    return axios.get(`${URL}getcolor/${id}`);
}

export function getCategories() {
    return axios.get(`${URL}getcategories`);
}

export function sortRating() {
    return axios.get(`${URL}sortrating`);
}

export function sortPriceAsc() {
    return axios.get(`${URL}sortpriceasc`);
}

export function sortPriceDesc() {
    return axios.get(`${URL}sortpricedesc`);
}
