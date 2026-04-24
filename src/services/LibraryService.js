const Book = require("../models/Book");
const User = require("../models/User");

class LibraryService {
  constructor({ bookRepository, userRepository }) {
    this.bookRepository = bookRepository;
    this.userRepository = userRepository;
  }

  registerUser({ id, name, email }) {
    this.validateRequiredString(name, "User name");
    this.validateRequiredString(email, "User email");

    if (this.userRepository.findByEmail(email)) {
      throw new Error("User with this email already exists");
    }

    const user = new User({
      id,
      name: name.trim(),
      email: email.trim().toLowerCase()
    });

    return this.userRepository.save(user);
  }

  findBooks(query) {
    this.validateRequiredString(query, "Search query");
    return this.bookRepository.findByTitleOrAuthor(query);
  }

  issueBook(bookId, userId) {
    const book = this.ensureBookExists(bookId);
    const user = this.ensureUserExists(userId);

    if (book.isIssued) {
      throw new Error("Book is already issued");
    }

    book.isIssued = true;
    book.issuedToUserId = user.id;

    return this.bookRepository.save(book);
  }

  returnBook(bookId) {
    const book = this.ensureBookExists(bookId);

    if (!book.isIssued) {
      throw new Error("Book is not currently issued");
    }

    book.isIssued = false;
    book.issuedToUserId = null;

    return this.bookRepository.save(book);
  }

  addBook({ id, title, author }) {
    this.validateRequiredString(title, "Book title");
    this.validateRequiredString(author, "Book author");

    const book = new Book({
      id,
      title: title.trim(),
      author: author.trim()
    });

    return this.bookRepository.save(book);
  }

  ensureBookExists(bookId) {
    const book = this.bookRepository.findById(bookId);

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  }

  ensureUserExists(userId) {
    const user = this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  validateRequiredString(value, fieldName) {
    if (typeof value !== "string" || value.trim() === "") {
      throw new Error(`${fieldName} is required`);
    }
  }
}

module.exports = LibraryService;
