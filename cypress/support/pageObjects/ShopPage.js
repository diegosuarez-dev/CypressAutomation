class ShopPage {
    visitHomePage() {
        return cy.visit(Cypress.env('url')+'/angularpractice');
    }    
    goToShop() {
        return cy.contains('Shop').click();
    }
    getProductCards() {
        return cy.get('app-card');
    }
    getCheckoutButton() {
        return cy.contains('Checkout');
    }
    getCountryInput() {
        return cy.get('#country');
    }
    getCountryInputResults() {
        return cy.get('.suggestions > ul > li > a');
    }
    getPurchaseButton() {
        return cy.contains('Purchase');
    }
    getAgreeConditionsCheckbox() {
        return cy.get('#checkbox2');
    }
    getAlertMessage() {
        return cy.get('.alert');
    }
    getItemTotals() {
        return cy.get('td:nth-child(4) strong');
    }
    getCartTotal() {
        return cy.get('td:nth-child(5) strong');
    }
}


export default ShopPage; 