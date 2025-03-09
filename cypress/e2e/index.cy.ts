import { API_ERROR_MESSAGE } from '../../src/constants/api-error-message';

describe('Email Invite Flow', () => {
  it('Success flow', () => {
    cy.visit('http://localhost:3000/');

    // Opens the form modal
    cy.contains('Request an invite').click();

    // Fill and submit the form
    cy.get('input[placeholder="Full name"]').type('Test Name');
    cy.get('input[placeholder="Email"]').type('test@test.com');
    cy.get('input[placeholder="Confirm email"]').type('test@test.com');

    cy.contains('Submit').click();

    // Show success content
    cy.contains('All done!').should('be.visible');
    cy.contains(
      'You will be one of the first to experience Broccoli & Co. when we launch.',
    ).should('be.visible');
  });

  it('Email used flow', () => {
    cy.visit('http://localhost:3000/');

    // Opens the form modal
    cy.contains('Request an invite').click();

    // Fill and attempt to submit the form
    cy.get('input[placeholder="Full name"]').type('Test Name');
    cy.get('input[placeholder="Email"]').type(Cypress.env('usedEmail'));
    cy.get('input[placeholder="Confirm email"]').type(Cypress.env('usedEmail'));

    cy.contains('Submit').click();

    // Error content will appear
    cy.contains(API_ERROR_MESSAGE.EMAIL_IN_USE).should('be.visible');
    cy.contains(
      'You will be one of the first to experience Broccoli & Co. when we launch.',
    ).should('not.exist');
  });
});
