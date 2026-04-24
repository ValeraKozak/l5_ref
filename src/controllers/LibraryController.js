const AddBookDto = require("../dto/AddBookDto");
const RegisterUserDto = require("../dto/RegisterUserDto");

class LibraryController {
  constructor(libraryService) {
    this.libraryService = libraryService;
  }

  registerUser(payload) {
    return this.libraryService.registerUser(new RegisterUserDto(payload));
  }

  searchBooks(query) {
    return this.libraryService.findBooks(query);
  }

  issueBook(bookId, userId) {
    return this.libraryService.issueBook(bookId, userId);
  }

  returnBook(bookId) {
    return this.libraryService.returnBook(bookId);
  }

  addBook(payload) {
    return this.libraryService.addBook(new AddBookDto(payload));
  }
}

module.exports = LibraryController;
