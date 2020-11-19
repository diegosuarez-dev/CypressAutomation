/// <reference types="Cypress"/>

describe('Practise test suite number 2', () => {
    it('Practise test case number 2', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.search-keyword').type('co');
        cy.wait(500);
        cy.get('.products').find('.product').each(($el,index,$list) => {
            $el.find('h4').text().includes('Brocolli')
            ? $el.find('button').trigger('click')
            : null
        });
        cy.get('.cart-icon > img').click();
        cy.get('.cart-preview > .action-block > button').click();
        cy.contains('Place Order').click();
    });
});