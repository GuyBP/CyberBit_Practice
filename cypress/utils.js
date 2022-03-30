import axios from "axios";
export const URL = 'https://reqres.in/';

export function getAddToCartBtn() {
    return cy.get('a').contains('Add to cart');
}

export function getProductAddedTitle() {
    return cy.get('h2').contains('Product successfully added to your shopping cart');
}

export function getProductName() {
    return cy.get('a.product-name');
}

export async function getUsersList() {
    const response = await axios.get(`${URL}api/users`);
    const total = response.data.total;
    const status = response.status;
    const data = response.data.data;
    return { total, status, data };
}