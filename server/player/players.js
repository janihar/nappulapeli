class Players {
  constructor(players) {
    this.players = players;
  }

  addPlayer(player) {
    this.players.push(player)
  }

  getPlayer() {
      return this.players;
  }
}

module.exports = Players
