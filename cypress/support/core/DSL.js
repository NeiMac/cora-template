/// <reference types="Cypress" />

export default class DSL {
    enterMicrofrontend() {
        return cy
            .get('#root-app_iframe')
            .its('0.contentDocument.body').should('not.be.empty')
            .should('not.be.undefined')
            .then(cy.wrap)
    }

    fixXHRRequests() {
        cy.intercept('https://login.microsoftonline.com/cef04b19-7776-4a94-b89b-375c77a8f936/oauth2/v2.0/token', (req) => {
            req.headers['Origin'] = 'https://hercules-nonprod.ambevdevs.com.br';
        })
    }

};

