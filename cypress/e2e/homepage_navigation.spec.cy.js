beforeEach(() => {
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles', {
    statusCode: 200,
    fixture: 'puzzles',
  }).as('Get All Puzzles');

  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles/s_2231', {
    statusCode: 200,
    fixture: 'puzzle',
  }).as('Get Current Puzzle');

  cy.visit('http://localhost:5173/');
});

describe('Navigate to a puzzle', () => {
  it('should load the page with a header, paragraph, and spinner svg', () => {
    cy.get('h1').should('contain', 'of Kevin Bacon');
    cy.get('p').should('contain', 'challenge your movie trivia.');
    cy.get('.buttons').should('have.descendants', '.loading-svg');
  });

  it('should navigate to a puzzle on a puzzle-button click', () => {
    cy.get('.buttons .movie-card').first().click();
    cy.get('#hub').find('image').should('have.attr', 'xlink:href')
    .and('include', '/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg');
  });
});
