export default class Score {
  constructor(readonly score: number = 0, readonly total: number = 0) {}

  goodAnswer = () => new Score(this.score + 1, this.total + 1)
  badAnswer = () => new Score(this.score, this.total + 1)
}
