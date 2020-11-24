/// <reference types="Cypress"/>

describe('API Mocking Test', () => {
    it('Test case 1', () => {
        let message = 'whoa, this comment does not exist';
        cy.visit('https://example.cypress.io/commands/network-requests');
        cy.server();
        cy.route({
          method: 'PUT',
          url: '**/comments/*',
          status: 404,
          response: { error: message },
          delay: 500,
          }).as('putComment')
          
          // we have code that puts a comment when
          // the button is clicked in scripts.js
          cy.get('.network-put').click()
          
          cy.wait('@putComment')
          
          // our 404 statusCode logic in scripts.js executed
          cy.get('.network-put-comment').should('contain', message)
    });
});