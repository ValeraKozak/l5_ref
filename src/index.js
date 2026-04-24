const Book = require("./models/Book");
const User = require("./models/User");
const BookRepository = require("./repositories/BookRepository");
const UserRepository = require("./repositories/UserRepository");
const LibraryService = require("./services/LibraryService");
const LibraryController = require("./controllers/LibraryController");

const bookRepository = new BookRepository([
  new Book({ id: 1, title: "Clean Code", author: "Robert C. Martin" }),
  new Book({ id: 2, title: "JavaScript: The Good Parts", author: "Douglas Crockford" }),
  new Book({ id: 3, title: "Refactoring", author: "Martin Fowler" })
]);

const userRepository = new UserRepository([
  new User({ id: 1, name: "Anna Kovalenko", email: "anna@example.com" })
]);

const libraryService = new LibraryService({ bookRepository, userRepository });
const libraryController = new LibraryController(libraryService);

console.log("Registered user:");
console.log(
  libraryController.registerUser({
    id: 2,
    name: "Ivan Shevchenko",
    email: "ivan@example.com"
  })
);

console.log("Search results for 'martin':");
console.log(libraryController.searchBooks("martin"));

console.log("Issue book #1 to user #2:");
console.log(libraryController.issueBook(1, 2));

console.log("Return book #1:");
console.log(libraryController.returnBook(1));
