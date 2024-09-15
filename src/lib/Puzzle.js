export default class Puzzle {
  constructor(puzzleInfo) {
    const { hub, movies, stars, wheel } = puzzleInfo;
    this.hub = hub;
    this.movies = movies;
    this.stars = stars;
    this.wheel = wheel.split('-');
  }
}
