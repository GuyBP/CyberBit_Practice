/// <reference types="cypress" />

import * as api from '../../utils.js'
import axios from "axios";

axios.defaults.timeout = 9000;

describe('API Tests', () => {

    it.only('Fetch the entire users list', async () => {
        const expectedTotal = 12;
        const expectedStatus = 200;
        const expectedFirstName = 'Tracey';
        const expectedLastName = 'Ramos';

        const { total, status, data } = await api.getUsersList();

        if (total !== expectedTotal) {
            throw new Error('test failed');
        }

        if (status !== expectedStatus) {
            throw new Error('test failed');
        }

        var found = false;
        data.forEach(user => {
            if (user.first_name == expectedFirstName && user.last_name == expectedLastName)
                found = true;
        });

        if (!found) {
            throw new Error('test failed');
        }


    })
})