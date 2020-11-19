/// <reference types="Cypress"/>
/// <reference types="cypress-iframe"/>
import 'cypress-iframe';

describe('Test suite 3', () => {
    it ('Checkbox practice', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1');
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
        cy.get('input[type="checkbox"]').check(['option2','option3']);
    });
    it('Static dropdowns practice', () => {
        cy.get('select').select('Option3').should('have.value','option3');
    });
    it ('Dynamic dropdowns practice', () => {
        cy.get('#autocomplete').type('es')
        cy.get('.ui-menu-item').each(($el, index, $list) => {
            $el.text().includes('Philippines')
            ? $el.trigger('click')
            : null
        });
        cy.get('#autocomplete').should('have.value', 'Philippines');
    });
    it('Hidden/displayed elements practice', () => {
        cy.get('#displayed-text').as('elementToPractice').should('be.visible');
        cy.get('#hide-textbox').click();
        cy.get('@elementToPractice').should('not.be.visible');
        cy.get('#show-textbox').click();
        cy.get('@elementToPractice').should('be.visible');
    });
    it('Radio buttons practice', () => {
        cy.get('input[value="radio2"]').click().should('be.checked');
    });
    it('Popups practice', () => {
        let name = 'Diego';
        cy.get('#name').type(name);
        cy.get('#alertbtn').click();//It just autoconfirms the alert without showing it
        cy.get('#name').type(name);//It just autoconfirms the popup without showing it
        cy.get('#confirmbtn').click();
        //To manipulate the popups by triggering the app events
        cy.on('window:alert', (string) => {
            expect(string).to.equal(`Hello ${name}, share this practice page and share your knowledge`);
        });
        cy.on('window:confirm', (string) => {
            expect(string).to.equal(`Hello ${name}, Are you sure you want to confirm?`);
            return false; //To press cancel instead of autoconfirm
        });
    });
    it('Dealing with tabs practice', () => {
        /*checking if it has target attr and removing it before clicking, so you can open
        the page in the same tab instead of in a new one*/
        cy.get('#opentab').invoke('removeAttr','target').click();
        //To steer away from app exceptions that otherwise would make the test fail
        cy.on('uncaught:exception', (err, runnable) => {
            cy.log(err.message);
            return false;
        });
        cy.url().should('include','rahulshettyacademy');
        cy.go('back'); //to go back to the previous page
    });
    it('Manipulating tables practice', () => {
        cy.get('#product tbody tr td:nth-child(2)').each(($el, index, $list) => {
            $el.text().includes('Python')
            ? cy.get('#product tbody tr td:nth-child(2)').eq(index).next().then((price) => {
                expect(price.text()).to.equal('25');
            })
            : null
        });
    });
    it('Handling mouse hover menus practice', () => {
        cy.get('.mouse-hover-content').invoke('show'); //To apply on the hidden elements' direct parent
        cy.contains('Top').click();
        cy.url().should('include','top');
        //If you want to click directly on hidden elements
        cy.contains('Top').click({force: true});
        cy.url().should('include','top');
    });
    it('Open in new tab / grabbing url to use cy.visit()', () => {
        const url = cy.get('#opentab').then((el) => {
            cy.visit(el.prop('href'));
            cy.on('uncaught:exception', (err, runnable) => {
                cy.log(err.message);
                return false;
            });
        });
    });
    it('Dealing with frames practice', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        cy.frameLoaded('#courses-iframe');
        cy.iframe().find('a[href="#/mentorship"]').eq(0).click();
        cy.iframe().find('.pricing-title').should('have.length',2);
    });
});