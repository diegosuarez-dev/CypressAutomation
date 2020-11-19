/// <reference types="Cypress"/>
import ShopPage from '../support/pageObjects/ShopPage';

describe('Test Framework 2 Suite', () => {
    let loadedData = null;
    const shoppage = new ShopPage();
    before(() => {
        Cypress.config('defaultCommandTimeout',8000);
        cy.fixture('test-case-2').then((data) => {
            loadedData = data;
        });
        shoppage.visitHomePage();
    });
    it('Test Case 1', () => {
        let totalAmount = 0;
        shoppage.goToShop();
        loadedData.products.forEach((productName) => {
            cy.AddToCart(productName);
        });
        shoppage.getCheckoutButton().click();
        shoppage.getItemTotals().then((totals) => {
            totals.toArray().forEach((element) => {
                const valueInString = element.textContent.substring(3);
                totalAmount += Number(valueInString);
            });
            shoppage.getCartTotal().should('have.text',`₹. ${totalAmount}`);
        });
        shoppage.getCheckoutButton().click();
        shoppage.getAgreeConditionsCheckbox().click({force:true});
        shoppage.getCountryInput().type(loadedData.country.substring(0,2));
        cy.contains(loadedData.country).click();
        shoppage.getCountryInput().should('have.value',loadedData.country);
        shoppage.getPurchaseButton().click();
        shoppage.getAlertMessage().should('include.text','Success! Thank you! Your order will be delivered in next few weeks :-)');
    });
});