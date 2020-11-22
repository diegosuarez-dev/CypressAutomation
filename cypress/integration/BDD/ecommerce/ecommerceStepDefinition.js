import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
/// <reference types="Cypress"/>
import ShopPage from '../../../support/pageObjects/ShopPage';

const shoppage = new ShopPage();
let totalAmount = 0;

Given('I open ecommerce page', () => {
    shoppage.goToShop();
});

When('I add items to cart', function() {
    this.data.products.forEach((productName) => {
        cy.AddToCart(productName);
    });
    shoppage.getCheckoutButton().click();
});

And('Validate total prices', () => {
    shoppage.getItemTotals().then((totals) => {
        totals.toArray().forEach((element) => {
            const valueInString = element.textContent.substring(3);
            totalAmount += Number(valueInString);
        });
        shoppage.getCartTotal().should('have.text', `₹. ${totalAmount}`);
    });
});

Then('Select country, submit and verify thank you message', function() {
    shoppage.getCheckoutButton().click();
    shoppage.getAgreeConditionsCheckbox().click({ force: true });
    shoppage.getCountryInput().type(this.data.country.substring(0, 2));
    cy.contains(this.data.country).click();
    shoppage.getCountryInput().should('have.value', this.data.country);
    shoppage.getPurchaseButton().click();
    shoppage.getAlertMessage().should('include.text', 'Success! Thank you! Your order will be delivered in next few weeks :-)');
});