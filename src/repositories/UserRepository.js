class UserRepository {
  constructor(initialUsers = []) {
    this.users = [...initialUsers];
  }

  getAll() {
    return [...this.users];
  }

  findById(id) {
    return this.users.find((user) => user.id === id) || null;
  }

  findByEmail(email) {
    const normalizedEmail = email.trim().toLowerCase();
    return this.users.find((user) => user.email.toLowerCase() === normalizedEmail) || null;
  }

  save(user) {
    this.users.push(user);
    return user;
  }
}

module.exports = UserRepository;
