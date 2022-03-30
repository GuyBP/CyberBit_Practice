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

export function getProductNameSummaryCart() {
    return cy.get('span.product-name');
}

export function getCloseBtn() {
    return cy.get('span.cross');
}

export function getCartQuantity() {
    return cy.get('span.ajax_cart_quantity');
}

export function getSearchInput() {
    return cy.get('input.search_query.form-control.ac_input');
}

export function getSearchBtn() {
    return cy.get('button.btn.btn-default.button-search');
}

export function getProductBlock() {
    return cy.get('li.ajax_block_product');
}

export function getSelect() {
    return cy.get('select.form-control');
}

export function getEmailInput() {
    return cy.get('input.form-control.grey.validate');
}

export function getTextareaInput() {
    return cy.get('textarea.form-control');
}

export function getBtn() {
    return cy.get('button');
}

export function getSuccessAlert() {
    return cy.get('p.alert.alert-success');
}

export async function getUsersList() {
    const response = await axios.get(`${URL}api/users`);

    const total = response.data.total;
    const status = response.status;
    const data = response.data.data;

    return { total, status, data };
}

export async function getSingleUser() {
    const response = await axios.get(`${URL}api/users/2`);

    const status = response.status;
    const firstName = response.data.data.first_name;
    const lastName = response.data.data.last_name;
    const data = response.data.data;

    return { status, firstName, lastName, data };
}

export async function createUser() {
    const response = await axios.post(`${URL}api/users`, { "name": 'Guy', "job": 'Tester' });

    const name = response.data.name;
    const job = response.data.job;
    const createdAt = response.data.createdAt;
    const status = response.status;

    return { name, job, createdAt, status };
}

export async function updateUser() {
    const response = await axios.put(`${URL}api/users/2`, { "name": 'Guy', "job": 'Tester' });

    const name = response.data.name;
    const job = response.data.job;
    const updatedAt = response.data.updatedAt;
    const status = response.status;

    return { name, job, updatedAt, status };
}