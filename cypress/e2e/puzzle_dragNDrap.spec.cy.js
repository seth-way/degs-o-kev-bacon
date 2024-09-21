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

describe('Pieces should be draggable to their corresponding containers', () => {
  it('lets you drag a movie piece to a movie slot', () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#m_273248').drag('#t1', { force: true });
    cy.get('#t1')
      .find('image')
      .should('have.attr', 'xlink:href')
      .and('include', '/jIywvdPjia2t3eKYbjVTcwBQlG8.jpg');
  });

  it('lets you drag a star piece to a star slot', () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#s_139').drag('#b1', { force: true });
    cy.get('#b1')
      .find('image')
      .should('have.attr', 'xlink:href')
      .and('include', '/lg04iEqT6TC40H1jz10Z99OFMXx.jpg');
  });
});

describe('Pieces should NOT be draggable to the wrong type of container', () => {
  it("doesn't let you drag a movie piece to a star slot", () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#m_273248').drag('#b1', { force: true });
    cy.get('#b1').find('image').should('not.exist');
  });

  it("doesn't let you drag a star piece to a movie slot", () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#s_139').drag('#t1', { force: true });
    cy.get('#b1').find('image').should('not.exist');
  });
});
