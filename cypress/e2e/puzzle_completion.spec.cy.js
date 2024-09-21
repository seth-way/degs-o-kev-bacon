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

describe('Show winner animation', () => {
  const completePuzzle = () => {
    cy.wait(['@Get Current Puzzle', '@Get All Puzzles']);
    const wheel =
      's_139-m_393-s_147-m_273248-s_6905-m_68718-s_27319-m_16869-s_287-m_319-s_4690-m_680'.split(
        '-'
      );

    for (let i = 0; i < 6; i += 1) {
      const starID = '#' + wheel[i * 2];
      const movieID = '#' + wheel[i * 2 + 1];
      cy.get(starID)
        .drag('#b' + (i + 1), {
          force: true,
        })
      if (i % 2 === 0) {
        cy.get(movieID)
          .drag('#t' + (i + 1), { target: { x: 50, y: 70 }, force: true })
      } else {
        cy.get(movieID)
          .drag('#t' + (i + 1), { target: { x: 50, y: 35 }, force: true })
      }
    }
  };

  it('shows the completed puzzle animations on a correctly filled puzzle', () => {
    completePuzzle();
    cy.get('body').should('have.attr', 'style', 'pointer-events: none;');
    cy.get('.animation-wrapper').find('canvas').should('exist');
  });

  it('resets game & removes confetti on reset button click', () => {
    completePuzzle();
    cy.get('body').should('have.attr', 'style', 'pointer-events: none;');
    cy.get('.animation-wrapper').find('canvas').should('exist');
    cy.get('.lucide-rotate-ccw').click();
    cy.get('.animation-wrapper').find('canvas').should('not.exist');
  });
});
