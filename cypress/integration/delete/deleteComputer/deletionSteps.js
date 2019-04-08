import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";

const BASE_URL = "http://computer-database.gatling.io";
const computer = {
    name: 'Test computer 3',
    introducedDate: '2019-01-02',
    discontinuedDate: '2019-02-03',
    companyId: 2
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

When('I click on "Delete this computer" button', () => {
    cy.scrollTo('top');
    cy.get('.btn.danger').click('bottom', { force: true});
});

Then('I see "Done! Computer has been deleted" in the title', () => {
    cy.get('.alert-message.warning').contains('Done! Computer has been deleted');
});