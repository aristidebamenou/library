const myLibrary = [];

function Book(title, author, numberOfPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function addBookToLibrary(title, author, numberOfPages, read) {
    let book = new Book(title, author, numberOfPages, read);
    myLibrary.push(book);
}
