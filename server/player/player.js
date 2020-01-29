class Player {
  constructor(userName, userPoints) {
    this.userName = userName;
    this.userPoint = userPoints;
  }

  getUsername() {
    return this.userName;
  }
  getPoints() {
    return this.userPoints;
  }
}

module.exports = Player;
