class BookRepository {
  constructor(initialBooks = []) {
    this.books = [...initialBooks];
  }

  getAll() {
    return [...this.books];
  }

  findById(id) {
    return this.books.find((book) => book.id === id) || null;
  }

  findByTitleOrAuthor(query) {
    const normalizedQuery = query.trim().toLowerCase();

    return this.books.filter((book) => {
      const titleMatches = book.title.toLowerCase().includes(normalizedQuery);
      const authorMatches = book.author.toLowerCase().includes(normalizedQuery);

      return titleMatches || authorMatches;
    });
  }

  save(book) {
    const existingBookIndex = this.books.findIndex((item) => item.id === book.id);

    if (existingBookIndex === -1) {
      this.books.push(book);
      return book;
    }

    this.books[existingBookIndex] = book;
    return book;
  }
}

module.exports = BookRepository;
