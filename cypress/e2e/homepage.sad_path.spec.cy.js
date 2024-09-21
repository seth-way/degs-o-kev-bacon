beforeEach(() => {
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles', {
    statusCode: 500,
  }).as('Failed to Fetch Puzzles');
  cy.visit('http://localhost:5173/');
});

describe('Load the homepage', () => {
  it('should load the page with a header, paragraph, and spinner svg', () => {
    cy.get('h1').should('contain', 'of Kevin Bacon');
    cy.get('p').should('contain', 'challenge your movie trivia.');
    cy.get('.buttons').should('have.descendants', '.loading-svg');
  });

  it('should redirect the user to an error page when resources fail to load', () => {
    cy.get('.buttons').should('have.descendants', '.loading-svg');
    cy.get('.buttons').should('not.exist');
    cy.get('.error').should('contain', '500');
  });
});
