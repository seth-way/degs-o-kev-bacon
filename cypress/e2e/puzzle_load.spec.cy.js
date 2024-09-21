beforeEach(() => {
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles/s_2231', {
    statusCode: 200,
    fixture: 'puzzle',
  }).as('Get Current Puzzle');
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles', {
    statusCode: 200,
    fixture: 'puzzles',
  }).as('Get All Puzzles');
  cy.visit('http://localhost:5173/puzzles/s_2231');
});

describe('Should load the puzzle', () => {
  it('should load the page with a spinner svg, then buttons, cards, and play areas', () => {
    // load spinner
    cy.get('.animation-wrapper').should('have.descendants', '.loading-svg');
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    // remove spinner
    cy.get('.animation-wrapper').should('not.have.descendants', '.loading-svg');
    // load pieces
    cy.get('#pieces-movie').find('button.piece').should('have.length', 6);
    cy.get('#pieces-star').find('button.piece').should('have.length', 6);
    // load play area
    cy.get('#puzzle').find('div > svg.lucide').should('have.length', 12);
    cy.get('#hub').should('have.descendants', 'image')
    // load the buttons
    cy.get('.buttons').find('button').should('have.length', 3);
  });

  it('Should load movie pieces, star pieces, and the hub image', () => {
    cy.get('#hub').find('image').should('have.attr', 'xlink:href')
    .and('include', '/AiAYAqwpM5xmiFrAIeQvUXDCVvo.jpg');
  })
});
