/// <reference types="Cypress" />

context('Exit modal testing', () => {
  const title = 'Digiklar';

  before(() => {
    cy.visit('http://localhost:3000/');

    cy.get('.startbutton').first().click();

    cy.get('.next-button').first().click();

    cy.get('.next-button').first().click();

    cy.get('.subject-btn').first().click();
  });

  it('exit button renders exit screen', () => {
    cy.get('.exit').first().click();

    cy.get('.choice-title').should('be.visible');

    cy.get('.choice-btn').first().should('contain', 'Til oversikt');
  });

  it('close button closes exit screen', () => {
    cy.get('.choice-btn').eq(1).click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.exit').first().click();
  });

  it('x in corner closes exit screen', () => {
    cy.get('.choice-nav-exit-btn').first().click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.exit').first().click();
  });

  it('exit button renders overview', () => {
    cy.get('.choice-btn').first().click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.subject-btn').first().should('contain', 'Å ringe og sende SMS');
  });

  it('exit button renders front page', () => {
    cy.get('.exit').first().click();

    cy.get('.choice-btn').first().should('contain', 'Avslutt').click();

    cy.get('.choice-title').should('not.be.visible');

    cy.get('.frontpage-header').first().should('contain', title);
  });

  it('has reloaded state after exit', () => {
    cy.get('.startbutton').first().click();

    cy.get('.h2').eq(1).should('contain', 'Mitt navn er');
  });

  it('prevents user from not setting an username', () => {
    cy.get('.exit').first().click();

    cy.get('.choice-btn').first().click();

    cy.get('.frontpage-header').first().should('contain', title);
  });

  it('prevents user from not setting devices', () => {
    cy.get('.startbutton').first().click();

    cy.get('.next-button').first().click();

    cy.get('.exit').first().click();

    cy.get('.choice-btn').first().click();

    cy.get('.frontpage-header').first().should('contain', title);
  });
});
