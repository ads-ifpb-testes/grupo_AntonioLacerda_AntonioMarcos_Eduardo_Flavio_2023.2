/// <reference types="cypress" />

describe('Index page', async () => {
  describe('Signin', () => {
    it('should login with a user then exists', () => {
      cy.visit('https://crimealert.surge.sh/');

      cy.get('#email').type('teste1@email.com');
      cy.get('#senha').type('123456');

      cy.get('#signin').click();

      cy.wait(10000);

      cy.get('#map').should('be.visible');
    });
    it('should not login with a user then not exists', () => {
      cy.visit('https://crimealert.surge.sh/');

      cy.get('#email').type('teste2');
      cy.get('#senha').type('123456');

      cy.get('#signin').click();

      cy.get('.iziToast-title').should('have.text', 'Erro ao fazer login');
    });
  });
  describe('Signup', () => {
    before(async () => {});
    it('should signup with a new user', () => {
      cy.visit('https://crimealert.surge.sh/');

      cy.get('p a').click();

      cy.get('#nome').type('teste2');
      cy.get('#email').type('test2@email.com');
      cy.get('#senha').type('123456');
      cy.get('#telefone').type('123456789');

      cy.get('#signup').click();

      cy.get('.iziToast-title').should('have.text', 'Sucesso');
    });
    it('should not signup with a user then exists', () => {
      cy.visit('https://crimealert.surge.sh/');

      cy.get('p a').click();

      cy.get('#nome').type('teste2');
      cy.get('#email').type('test2@email.com');
      cy.get('#senha').type('123456');
      cy.get('#telefone').type('123456789');

      cy.get('#signup').click();

      cy.get('.iziToast-message').should(
        'have.text',
        'Não foi possível cadastrar o usuário!'
      );
    });
  });
});
