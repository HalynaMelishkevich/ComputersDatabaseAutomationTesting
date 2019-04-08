import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";

const BASE_URL = "http://computer-database.gatling.io";
const computer = {
    name: 'Test computer 3',
    introducedDate: '2019-01-02',
    discontinuedDate: '2019-02-03',
    companyId: 2
};
const updatedComputer = {
    name: 'Test computer 2',
    introducedDate: '2019-01-03',
    discontinuedDate: '2019-02-04',
    company: 'RCA',
    companyId: '3'
};

Given(`I open test computer`, () => {
    cy.request('POST', `${BASE_URL}/computers?name=${encodeURI(computer.name)}&introduced=${computer.introducedDate}&discontinued=${computer.discontinuedDate}&company=${computer.companyId}`)
        .request('GET', `${BASE_URL}/computers?f=${encodeURI(computer.name)}`)
        .then((response) => {
            return response.body.match('<td><a href="\/computers\/....')[0].match(/\d+/)[0];
        }).then((id) => {
        cy.visit(`${BASE_URL}/computers/${id}`);
    });
});

When(`I input "Test computer 2" into Computer Name input field`, () => {
    cy.get('.input>#name').focus().clear().type(updatedComputer.name);
});

When(`I input "2019-01-03" into Introduced Date input field`, () => {
    cy.get('.input>#introduced').focus().clear().type(updatedComputer.introducedDate);
});

When(`I input "2019-02-04" into Discontinued Date input field`, () => {
    cy.get('.input>#discontinued').focus().clear().type(updatedComputer.discontinuedDate);
});

When(`I select "RCA" company from dropdown`, () => {
    cy.get('.input>#company').select(updatedComputer.company)
});

When(`I click on "Save this computer" button`, () => {
    cy.get('.btn.primary').click();
});

Then(`"Done! Computer Test computer 2 has been updated" message is displayed`, () => {
    cy.get('.alert-message.warning').contains(`Done! Computer ${updatedComputer.name} has been updated`);
});

Then(`I ensure my computer is updated`, () => {
    cy.request('GET', `${BASE_URL}/computers?f=${encodeURI(updatedComputer.name)}`)
        .then((response) => {
            return response.body.match('<td><a href="\/computers\/....')[0].match(/\d+/)[0];
        })
        .then((id) => {
            cy.visit(`${BASE_URL}/computers/${id}`);
        });
    cy.get('#name').should('have.value', updatedComputer.name);
    cy.get('#introduced').should('have.value', updatedComputer.introducedDate);
    cy.get('#discontinued').should('have.value', updatedComputer.discontinuedDate);
    cy.get('#company').should('have.value', updatedComputer.companyId);
});

Then(`Test data deleted`, () => {
    cy.request('GET', `${BASE_URL}/computers?f=${encodeURI(updatedComputer.name)}`)
        .then((response) => {
            const id = response.body.match('<td><a href="\/computers\/....')[0].match(/\d+/)[0];
            cy.request('POST', `${BASE_URL}/computers/${id}/delete`);
        });
    cy.request('GET', `${BASE_URL}/computers?f=${encodeURI(computer.name)}`)
        .then((response) => {
            const id = response.body.match('<td><a href="\/computers\/....')[0].match(/\d+/)[0];
            cy.request('POST', `${BASE_URL}/computers/${id}/delete`);
        });
});