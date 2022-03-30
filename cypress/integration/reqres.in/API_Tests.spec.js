/// <reference types="cypress" />

import * as api from '../../utils.js'
import axios from "axios";

axios.defaults.timeout = 9000;

describe('API Tests', () => {

    it('Fetch the entire users list', async () => {
        const expectedTotal = 12;
        const expectedStatus = 200;
        const expectedFirstName = 'Tracey';
        const expectedLastName = 'Ramos';

        const { total, status, data } = await api.getUsersList();

        if (total !== expectedTotal) {
            throw new Error(`Test failed: expected total doesn't match actual total`);
        }

        if (status !== expectedStatus) {
            throw new Error(`Test failed: expected status doesn't match actual status`);
        }

        // Search for specific user
        var found = false;
        data.forEach(user => {
            if (user.first_name == expectedFirstName && user.last_name == expectedLastName)
                found = true;
        });

        if (!found) {
            throw new Error(`Test failed: expected user isn't actual user`);
        }


    })

    it('Fetch a single user', async () => {
        const expectedStatus = 200;
        const expectedData = {
            "id": 2,
            "email": "janet.weaver@reqres.in",
            "first_name": "Janet",
            "last_name": "Weaver",
            "avatar": "https://reqres.in/img/faces/2-image.jpg"
        };
        const { status, firstName, lastName, data } = await api.getSingleUser();

        if (status !== expectedStatus) {
            throw new Error(`Test failed: expected status doesn't match actual status`);
        }

        if (JSON.stringify(data).includes(expectedData)) {
            throw new Error(`Test failed: expected data doesn't match actual data`);
        }
    })

    it('Create a new user', async () => {
        const expectedStatus = 201;
        const expectedName = "Guy";
        const expectedJob = "Tester";

        // Create expected date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const expectedCreatedAt = today;

        const { name, job, createdAt, status } = await api.createUser();

        if (status !== expectedStatus) {
            throw new Error(`Test failed: expected status doesn't match actual status`);
        }

        if (name !== expectedName) {
            throw new Error(`Test failed: expected name doesn't match actual name`);
        }

        if (job !== expectedJob) {
            throw new Error(`Test failed: expected job doesn't match actual job`);
        }

        if (!createdAt.includes(expectedCreatedAt)) {
            throw new Error(`Test failed: expected date created doesn't match actual date created`);
        }
    })

    it('Update existing user', async () => {
        const expectedStatus = 200;
        const expectedName = "Guy";
        const expectedJob = "Tester";

        // Create expected date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        const expectedUpdatedAt = today;

        const { name, job, updatedAt, status } = await api.updateUser();

        if (status !== expectedStatus) {
            throw new Error(`Test failed: expected status doesn't match actual status`);
        }

        if (name !== expectedName) {
            throw new Error(`Test failed: expected name doesn't match actual name`);
        }

        if (job !== expectedJob) {
            throw new Error(`Test failed: expected job doesn't match actual job`);
        }

        if (!updatedAt.includes(expectedUpdatedAt)) {
            throw new Error(`Test failed: expected date updated doesn't match actual date updated`);
        }
    })
})