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
  cy.get('.lucide-house').as('home-btn');
  cy.get('.lucide-rotate-ccw').as('reset-btn');
});

describe('Home buttons should work as expected', () => {
  it('should reset the puzzle on puzzle reset click', () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#s_139').drag('#b1', { force: true });
    cy.get('#b1')
      .find('image')
      .should('have.attr', 'xlink:href')
      .and('include', '/lg04iEqT6TC40H1jz10Z99OFMXx.jpg');

    cy.get('#m_273248').drag('#t1', { force: true });
    cy.get('#t1')
      .find('image')
      .should('have.attr', 'xlink:href')
      .and('include', '/jIywvdPjia2t3eKYbjVTcwBQlG8.jpg');

    cy.get('@reset-btn').click();

    cy.get('#b1')
    .find('image')
    .should('not.exist')

    cy.get('#t1')
    .find('image')
    .should('not.exist')
  });
  
  it('should send the user home on home button click', () => {
    cy.get('#puzzle').should('exist');
    cy.get('@home-btn').click();
    cy.get('#puzzle').should('not.exist');
    cy.url().should('eq', 'http://localhost:5173/')
    cy.get('h1').should('contain', 'of Kevin Bacon');
  });
});
