class HomePage {
    visitHomePage() {
        return cy.visit(Cypress.env('url')+'/angularpractice/');
    }
    getNameInput() {
        return cy.get('input[name="name"]:nth-child(2)');
    }
    getGenderDropdown() {
        return cy.get('select');
    }
    getTwoWayBindingInput() {
        return cy.get('input[name="name"]:nth-child(1)');
    }
    getEnterpreneurRadioButton() {
        return cy.get('#inlineRadio3');
    }
}

export default HomePage;