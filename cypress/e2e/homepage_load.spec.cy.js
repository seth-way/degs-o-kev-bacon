beforeEach(() => {
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles', {
    statusCode: 200,
    fixture: 'puzzles',
  }).as('Get All Puzzles');
  cy.visit('http://localhost:5173/');
});

describe('Load the homepage', () => {
  it('should load the page with a header, paragraph, and spinner svg', () => {
    cy.get('h1').should('contain', 'of Kevin Bacon');
    cy.get('p').should('contain', 'challenge your movie trivia.');
    cy.get('.buttons').should('have.descendants', '.loading-svg');
  });

  it('should replace the loading svg with puzzle buttons after data loads', () => {
    cy.get('.buttons').should('have.descendants', '.loading-svg');
    cy.get('.buttons').should('not.have.descendants', '.loading-svg');
    cy.get('.buttons').find('button').should('have.length', 3);
  });
});
