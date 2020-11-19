/// <reference types="Cypress"/>
import HomePage from '../support/pageObjects/HomePage';

describe('Test Framework Suite', () => {
    let loadedData = null;
    let minlenght = null;
    const homepage = new HomePage();
    before(() => {
        cy.fixture('test-case-1').then((data) => {
            loadedData = data;
        });
        homepage.visitHomePage();
    });
    it('Test case 1', () => {
        homepage.getNameInput().type(loadedData.name);
        homepage.getGenderDropdown().select(loadedData.gender);
    });
    it('Test case 2', () => {
        homepage.getNameInput().clear().type(loadedData.otherName);
        //First way: checking the length of the string
        homepage.getNameInput().then((element) => {
            expect(element.val()).to.have.length.of.at.least(2);
        });
        //Second way: checking the minlenght property after resolving promise
        homepage.getNameInput().then(($el) => {
            expect($el.attr('minlength')).to.equal('2');
        });
        //Third way: checking the minlength property with cy commands
        homepage.getNameInput().should('have.attr','minlength','2');
        //First way: grabbing value from 1 input to compare with the other
        homepage.getNameInput().then((el) => {
            let valueFromNameInput = el.val();
            homepage.getTwoWayBindingInput().should('have.value',valueFromNameInput);
        });
        //Second way: assuming that both values should be exactly the same
        homepage.getTwoWayBindingInput().should('have.value',loadedData.otherName);
        homepage.getEnterpreneurRadioButton().should('be.disabled');
        homepage.getGenderDropdown().select(loadedData.otherGender);
    });
});