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
  cy.get('.lucide-circle-help').as('help-btn');
});

describe('Should give the appropriate hint based on game-state', () => {
  it('gives the user the rules when no pieces are played', () => {
    cy.get('@help-btn').click();
    cy.get('.hint-message').find('h2').contains('How to Play:')
  });

  it('gives feedback to keep going when pieces are correctly placed', () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#s_139').drag('#b1', { force: true });
    cy.get('#m_319').drag('#t2', { force: true });
    cy.get('@help-btn').click();
    cy.get('.hint-message').contains('Fill in more pieces & ask again.')
  });

  it('gives a helpful hint when a piece in incorrectly placed', () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    cy.get('#s_139').drag('#b1', { force: true });
    cy.get('#m_319').drag('#t1', { force: true });
    cy.get('@help-btn').click();
    cy.get('.hint-message').contains('Uma Thurman wasn\'t in True Romance')
  });

  it('removes the hint on user click', () => {
    cy.get('@help-btn').click();
    cy.get('.hint-message').find('h2').contains('How to Play:');
    cy.get('.lucide-circle-x').click();
    cy.get('.hint-message').should('not.exist')
  })
})
