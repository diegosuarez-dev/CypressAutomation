import ShopPage from '../../../support/pageObjects/ShopPage';
const shoppage = new ShopPage();

before(function() {
    Cypress.config('defaultCommandTimeout', 8000);
    cy.fixture('test-case-2').then((data) => {
        this.data = data;
    });
    shoppage.visitHomePage();
});