class Confirm {
  static #list = [];

  constructor(email) {
    this.email = email;
    this.token = Confirm.generateToken();
  }

  static generateToken() {
    const length = 6;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  static create(email) {
    const confirm = new Confirm(email);
    this.#list.push(confirm);
    return confirm;
  }

  static getByToken(token) {
    return this.#list.find((confirm) => confirm.token === token) || null;
  }

  static remove(token) {
    this.#list = this.#list.filter((confirm) => confirm.token !== token);
  }
}

module.exports = {
  Confirm,
};

