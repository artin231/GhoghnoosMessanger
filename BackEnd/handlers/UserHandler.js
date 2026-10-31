class UserHandler {
  async Login(req, res) {
    res.send("login");
  }

  async SignUp(req, res) {
    res.send("signup");
  }

  async Profile(req, res) {
    res.send("profile");
  }

  async Logout(req, res) {
    res.send("logout");
  }
}

module.exports = UserHandler;
