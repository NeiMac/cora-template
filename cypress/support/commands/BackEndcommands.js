Cypress.Commands.add('validateRoute', (route, statusCode = 200) => {
    cy.wait(route, { timeout: 60000 })
        .its('response')
        .should('deep.include', {
            statusCode: statusCode
        });
});

