/// <reference types="Cypress" />

context('Pre-exam', () => {
  const username = 'little-kangaroo';
  const title = 'Digiklar';

  before(() => {
    cy.visit('http://localhost:3000/');
  });

  it('front page contains an examination blurb', () => {
    cy.get('.frontpage-header').first().should('contain', title);
  });

  it('examination blurb button is clickable, the start page renders username input', () => {
    cy.get('.startbutton').first().click();

    cy.get('.h2').eq(1).should('contain', 'Mitt navn er');
  });

  it('username input contains a navigation menu', () => {
    cy.get('.nav-img').first().should('be.visible');
  });

  it('username is visible when typing', () => {
    cy.get('.input-field').first().type(username);

    cy.get('.username').first().should('contain', username);
  });

  it('username button is clickable and renders what units', () => {
    cy.get('.next-button').first().click();

    cy.get('.h2').eq(1).should('contain', 'Hvilke enheter har du?');
  });

  it('what units contains a navigation menu', () => {
    cy.get('.nav-img').first().should('be.visible');
  });

  it('what units buttons are clickable', () => {
    cy.get('.unit-btn').first().click().click();

    cy.get('.unit-btn').eq(1).click();

    cy.get('.unit-btn').eq(2).click();
  });

  it('what units is clickable and renders overview', () => {
    cy.get('.next-button').first().click();

    const titles = [
      'Å ringe og sende SMS',
      'Innstillinger og tilpasning av mobil',
      'Passord, innlogging og BankID',
      'E-post'
    ];
    cy.get('.subject-btn').each(($el, i) =>
      cy.wrap($el).should('contain', titles[i])
    );
  });

  it('overview contains a navigation menu', () => {
    cy.get('.nav-img').first().should('be.visible');
  });

  it('overview button is clickable and renders result', () => {
    cy.get('.next-button').first().click();

    cy.get('.choice-title')
      .first()
      .should('contain', 'Resultat')
      .and('contain', username);
  });

  it('result contains a navigation menu', () => {
    cy.get('.nav-img').first().should('be.visible');
  });

  it('result is downloadable', () => {
    cy.get('.download').first().click();
  });

  it('a reload brings you to start page', () => {
    cy.reload();
    cy.get('.frontpage-header').first().should('contain', title);

    // reload the page without using the cache
    //cy.reload(true)
  });
});
