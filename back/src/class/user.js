class User {
  static #list = [];
  static #count = 1;

  constructor({ email, password }) {
    this.id = User.#count++;
    this.email = String(email).toLowerCase();
    this.password = String(password);
    this.isConfirmed = false;
  }

  static create(data) {
    const user = new User(data);
    User.#list.push(user);
    return user;
  }

  static getByEmail(email) {
    return User.#list.find((user) => user.email === String(email).toLowerCase()) || null;
  }

  static getById(id) {
    return User.#list.find((user) => user.id === Number(id)) || null;
  }

  static getList() {
    return User.#list;
  }

  static updateConfirmation(email) {
    const user = User.getByEmail(email);
    if (user) {
      user.isConfirmed = true;
      return true;
    }
    return false;
  }

  static updatePassword(email, newPassword) {
    const user = User.getByEmail(email);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }
}

module.exports = {
  User,
};

