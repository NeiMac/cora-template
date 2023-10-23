/// <reference types ="cypress"/>

import DSL from '../../core/DSL';
import 'cypress-iframe';

export default class loginPage extends DSL {
    urlCora() {
        cy.visit("/");
        this.fixXHRRequests();
    }

    clickAmbevButton() {
        cy
            .get('#login-container')
            .find('.login-btn')
            .filter(':visible')
            .first()
            .should('have.text', 'Entrar como Ambev')
            .click()
    }
}