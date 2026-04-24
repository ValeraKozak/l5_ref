const Book = require("../src/models/Book");
const User = require("../src/models/User");
const BookRepository = require("../src/repositories/BookRepository");
const UserRepository = require("../src/repositories/UserRepository");
const LibraryService = require("../src/services/LibraryService");

function createService() {
  const bookRepository = new BookRepository([
    new Book({ id: 1, title: "Clean Code", author: "Robert C. Martin" }),
    new Book({ id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" }),
    new Book({
      id: 3,
      title: "Refactoring",
      author: "Martin Fowler",
      isIssued: true,
      issuedToUserId: 1
    })
  ]);

  const userRepository = new UserRepository([
    new User({ id: 1, name: "Anna", email: "anna@example.com" })
  ]);

  const service = new LibraryService({ bookRepository, userRepository });

  return { service, bookRepository, userRepository };
}

test("registerUser successfully saves a new user", () => {
  const { service, userRepository } = createService();

  const user = service.registerUser({
    id: 2,
    name: "Ivan",
    email: "ivan@example.com"
  });

  expect(user.email).toBe("ivan@example.com");
  expect(userRepository.getAll()).toHaveLength(2);
});

test("registerUser rejects duplicate email", () => {
  const { service } = createService();

  expect(() =>
    service.registerUser({ id: 2, name: "Anna Duplicate", email: "anna@example.com" })
  ).toThrow(/already exists/);
});

test("findBooks returns matches by title", () => {
  const { service } = createService();

  const results = service.findBooks("Clean");

  expect(results).toHaveLength(1);
  expect(results[0].title).toBe("Clean Code");
});

test("findBooks returns matches by author", () => {
  const { service } = createService();

  const results = service.findBooks("martin");

  expect(results).toHaveLength(2);
});

test("issueBook successfully assigns a book to an existing user", () => {
  const { service, bookRepository } = createService();

  const book = service.issueBook(1, 1);

  expect(book.isIssued).toBe(true);
  expect(book.issuedToUserId).toBe(1);
  expect(bookRepository.findById(1).isIssued).toBe(true);
});

test("issueBook rejects already issued book", () => {
  const { service } = createService();

  expect(() => service.issueBook(3, 1)).toThrow(/already issued/);
});

test("issueBook rejects unknown user", () => {
  const { service } = createService();

  expect(() => service.issueBook(1, 999)).toThrow(/User not found/);
});

test("returnBook successfully marks a book as available", () => {
  const { service, bookRepository } = createService();

  const book = service.returnBook(3);

  expect(book.isIssued).toBe(false);
  expect(book.issuedToUserId).toBeNull();
  expect(bookRepository.findById(3).isIssued).toBe(false);
});

test("returnBook rejects a book that was not issued", () => {
  const { service } = createService();

  expect(() => service.returnBook(1)).toThrow(/not currently issued/);
});

test("findBooks rejects empty query", () => {
  const { service } = createService();

  expect(() => service.findBooks("   ")).toThrow(/Search query is required/);
});
