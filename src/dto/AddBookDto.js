class AddBookDto {
  constructor({ id, title, author }) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}

module.exports = AddBookDto;
