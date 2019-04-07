import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const BASE_URL = "http://computer-database.gatling.io";
const computer = {
    name: 'Test computer 1',
    introducedDate: '2019-01-01',
    discontinuedDate: '2019-02-02',
    company: 'Apple Inc.'
};

Given(`I open Computers Database web application`, () => {
    cy.visit(BASE_URL);
});

When(`I click on Add a new computer button`, () => {
    cy.get('#add').click();
});

Then(`I see "Add a computer" in the title`, () => {
    cy.get('#main > h1').should('have.text', 'Add a computer');
});

When(`I input "Test computer 1" into Computer Name input field`, () => {
    cy.get('.input>#name').focus().type(computer.name);
});

When(`I input "2019-01-01" into Introduced Date input field`, () => {
    cy.get('.input>#introduced').focus().type(computer.introducedDate);
});

When(`I input "2019-02-02" into Discontinued Date input field`, () => {
    cy.get('.input>#discontinued').focus().type(computer.discontinuedDate);
});

When(`I select "Apple Inc." company from dropdown`, () => {
    cy.get('.input>#company').select(computer.company)
});

When(`I click on "Create this computer" button`, () => {
    cy.get('input[type=submit]').click();
});

Then(`"Done! Computer Test computer 1 has been created" message is displayed`, () => {
    cy.get('.alert-message.warning').contains(`Computer ${computer.name} has been created`);
});

Then(`Test data deleted`, () => {
    cy.request('GET', `http://computer-database.gatling.io/computers?f=${encodeURI(computer.name)}`)
    .then((response) => {
        const id = response.body.match('<td><a href="\/computers\/....')[0].slice(-4);
        cy.request('POST', `${BASE_URL}/computers/${id}/delete`);
    })
});