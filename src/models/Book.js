class Book {
  constructor({ id, title, author, isIssued = false, issuedToUserId = null }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isIssued = isIssued;
    this.issuedToUserId = issuedToUserId;
  }
}

module.exports = Book;
