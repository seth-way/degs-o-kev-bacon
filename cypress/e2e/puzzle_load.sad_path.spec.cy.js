beforeEach(() => {
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles/s_2231', {
    statusCode: 500,
  }).as('Fetch Fail');
  cy.intercept('https://degs-o-kev-bacon-api.vercel.app/api/puzzles', {
    statusCode: 200,
    fixture: 'puzzles',
  }).as('Get All Puzzles');
  cy.visit('http://localhost:5173/puzzles/s_2231');
});

describe('Should load the puzzle', () => {
  it('should load the page with a spinner svg, but redirect to an error message on fetch fail', () => {
    // load spinner
    cy.get('.animation-wrapper').should('have.descendants', '.loading-svg');
    cy.wait(['@Fetch Fail', '@Get All Puzzles']);
    // load the error message
    cy.get('#puzzle').should('not.exist');
    cy.get('.error').should('contain', '500');
  });
});
