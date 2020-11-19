/// <reference types="Cypress"/>

describe('My first test suite', () => {
    it('My first test case', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
        cy.get('.search-keyword').type('ca');
        cy.get('.products').as('productsLocator');
        cy.get('.product:visible').should('have.length',4);
        //parent-child chaining
        cy.get('@productsLocator').find('.product').should('have.length',4).then(() => console.log('console.log en secuencia tras resolver promesa'));
        cy.get('@productsLocator').find('.product').eq(2).contains('ADD TO CART').click(); //using eq(index)
        console.log('console.log fuera de secuencia');
        //using each(cb) to manipulate the array
        cy.get('@productsLocator').find('.product').each(($el, index, $list) => { 
            $el.find('h4').text().includes('Capsicum') 
            ? $el.find('button').trigger('click')
            : null
        });
        //resolving promise to use 'logo' as a JQuery element
        cy.get('.brand').then((logo) => {
            cy.log(logo.text());
        })
        //checking if logo text is correct
        cy.get('.brand').should('have.text','GREENKART');
    });
});