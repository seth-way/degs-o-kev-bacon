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
    if (incomplete) return false;
    const b1 = game.b1.current;
    const b1Idx = this.wheel.indexOf(b1);
    const solution1 = [
      ...this.wheel.slice(b1Idx),
      ...this.wheel.slice(0, b1Idx),
    ];
    const solution2 = [b1, ...solution1.slice(1).reverse()];
    const gameState = wheelOrder.map(id => game[id].current);

    return areDeepEql(gameState, solution1) || areDeepEql(gameState, solution2);
  }

  giveHint(game) {
    const zones = { ...game };
    delete zones.hub;
    // const occupiedZones = Object.values(zones).reduce(
    //   (total, zone) => (total + zone.current ? 1 : 0),
    //   0
    // );
    // if (occupiedZones < 3) return 'Fill in more pieces & try again.';
    console.log('wheel --->', this.wheel);
    for (const [zone, { current }] of Object.entries(zones)) {
      if (!current) continue;
      const [zone1, zone2] = getNeighboringZones(zone);
      const correctNeighbors = getCorrectNeighbors(current, this.wheel);
      const neighbor1 = game[zone1].current;
      console.log('neighbor1 <<><>>', neighbor1);
      if (neighbor1 && !correctNeighbors.includes(neighbor1))
        return this.getHintMessage(neighbor1, current);
      const neighbor2 = game[zone2].current;
      console.log('neighbor2 <<><>>', neighbor2);
      if (neighbor2 && !correctNeighbors.includes(neighbor2))
        return this.getHintMessage(neighbor2, current);
    }

    return 'Fill in more pieces & try again.';
  }

  getHintMessage(id1, id2) {
    const starId = id1.startsWith('s') ? id1 : id2;
    const movieId = id1.startsWith('m') ? id1 : id2;
    const star = this.stars[starId].text;
    const movie = this.movies[movieId].text;
    return `${star} wasn't in ${movie}`;
  }
}

function areDeepEql(arr1, arr2) {
  return arr1.join('') === arr2.join('');
}

function getNeighboringZones(zone) {
  const idx = wheelOrder.indexOf(zone);
  const neighbor1Idx = idx - 1 === -1 ? wheelOrder.length - 1 : idx - 1;
  const neighbor2Idx = idx + 1 === wheelOrder.length ? 0 : idx + 1;
  return [wheelOrder[neighbor1Idx], wheelOrder[neighbor2Idx]];
}

function getCorrectNeighbors(id, wheel) {
  const idx = wheel.indexOf(id);
  const neighbor1Idx = idx - 1 === -1 ? wheel.length - 1 : idx - 1;
  const neighbor2Idx = idx + 1 === wheel.length ? 0 : idx + 1;
  return [wheel[neighbor1Idx], wheel[neighbor2Idx]];
}
