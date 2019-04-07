import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const url = "http://computer-database.gatling.io";

Given(`I open Computers Database web application`, () => {
    cy.visit(url);
});

When(`I click on Add a new computer button`, () => {
    cy.get('#add').click();
});

Then(`I see "Add a computer" in the title`, () => {
    cy.get('section>h1').should('eq', 'Add a computer');
});

When(`I input "Test computer 1" into Computer Name input field`, () => {
    cy.get('.input>#name').focus().type('Test computer 1');
});

When(`I input "2019-01-01" into Introduced Date input field`, () => {
    cy.get('.input>#introduced').focus().type('2019-01-01');
});

When(`I input "2019-02-02" into Discontinued Date input field`, () => {
    cy.get('.input>#discontinued').focus().type('2019-02-02');
});

When(`I select "Apple Inc." company from dropdown`, () => {
    cy.get('.input>#company').select('Apple Inc.')
});

When(`I click on "Create this computer" button`, () => {
    cy.get('input[type=submit]').click();
});

Then(`"Done! Computer Test computer 1 has been created" message is displayed`, () => {
    cy.get('.alert-message.warning').should('include', 'Computer Test computer 1 has been created');
});