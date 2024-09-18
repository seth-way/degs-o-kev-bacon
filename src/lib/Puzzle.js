const wheelOrder = [
  'b1',
  't1',
  'b2',
  't2',
  'b3',
  't3',
  'b4',
  't4',
  'b5',
  't5',
  'b6',
  't6',
];
export default class Puzzle {
  constructor(puzzleInfo) {
    const { hub, movies, stars, wheel } = puzzleInfo;
    this.hub = hub;
    this.movies = movies;
    this.stars = stars;
    this.wheel = wheel.split('-');
  }

  checkGame(game) {
    const incomplete = Object.values(game).some(space => !space.current);
    //if (incomplete) console.log(incomplete);
    const b1 = game.b1.current;
    if (b1) {
      // remove check for b1 and uncomment check for completion
      const b1Idx = this.wheel.indexOf(b1);
      const solution1 = [
        ...this.wheel.slice(b1Idx),
        ...this.wheel.slice(0, b1Idx),
      ];
      const solution2 = [b1, ...solution1.slice(1).reverse()];
      const gameState = wheelOrder.map(id => game[id].current);

      console.log(
        'winner? ',
        areDeepEql(gameState, solution1) || areDeepEql(gameState, solution2)
      );
      return (
        areDeepEql(gameState, solution1) || areDeepEql(gameState, solution2)
      );
    }
  }

  giveHint(game) {}
}

function areDeepEql(arr1, arr2) {
  return arr1.join('') === arr2.join('');
}
