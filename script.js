import { faker } from "https://esm.sh/@faker-js/faker@v10.3.0";

const INITIAL_BOOK_COUNT = 10;
const MAX_PAGES = 800;

function Book(title, author, numberOfPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = parseInt(numberOfPages, 10);
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function Library() {
    this.books = [];
}

Library.prototype.initialize = function() {
    for (let i = 0; i < INITIAL_BOOK_COUNT; i++) {
        this.addBook(faker.book.title(), faker.book.author(), Math.floor(Math.random() * MAX_PAGES), Math.random() < 0.5);
    }
}

Library.prototype.addBook = function(title, author, numberOfPages, read) {
    const book = new Book(title, author, numberOfPages, read);
    this.books.push(book);
}

Library.prototype.findBookIndex = function(bookId) {
    return this.books.findIndex(book => book.id === bookId);
}

Library.prototype.removeBook = function(bookId) {
    const index = this.findBookIndex(bookId);
    if (index < 0) return;

    this.books.splice(index, 1);
}

Library.prototype.toggleBookRead = function(bookId) {
    const index = this.findBookIndex(bookId);
    if (index < 0) return;

    this.books[index].toggleRead();
}

Library.prototype.forEach = function(callback) {
    this.books.forEach(book => callback(book));
}

function LibraryContainerBuilder(libraryContainerId, library) {
    this.library = library;
    this.libraryContainer = document.getElementById(libraryContainerId);
}

LibraryContainerBuilder.prototype.display = function() {
    this.library.forEach((book) => {
        const bookCard = new BookCardBuilder(this.libraryContainer, book);
        bookCard.display();
    });
}

LibraryContainerBuilder.prototype.refresh = function() {
    this.libraryContainer.innerHTML = "";
    this.display();
}

LibraryContainerBuilder.prototype.initRemoveListener = function() {
    document.addEventListener("click", (e) => {
        if(!e.target.classList.contains("removeBookButton")) return;

        this.library.removeBook(e.target.dataset.id);
        this.refresh();
    });
}

LibraryContainerBuilder.prototype.initToggleReadListener = function() {
    document.addEventListener("click", (e) => {
        if(!e.target.classList.contains("readBookButton")) return;

        this.library.toggleBookRead(e.target.dataset.id);
        this.refresh();
    });
}

function BookCardBuilder(libraryContainer, book) {
    this.book = book;

    this.libraryContainer = libraryContainer;

    this.col = document.createElement("div");
    this.card = document.createElement("div");
    this.cardTitle = document.createElement("h5");
    this.cardSubtitle = document.createElement("h6");
    this.cardBody = document.createElement("div");
    this.cardText = document.createElement("p");
    this.cardFooter = document.createElement("div");
    this.readButton = document.createElement("button");
    this.removeButton = document.createElement("button");
}

BookCardBuilder.prototype.build = function() {
    this.cardBody.appendChild(this.cardTitle);
    this.cardBody.appendChild(this.cardSubtitle);
    this.cardBody.appendChild(this.cardText);
    this.card.appendChild(this.cardBody);
    this.cardFooter.appendChild(this.readButton);
    this.cardFooter.appendChild(this.removeButton);
    this.card.appendChild(this.cardFooter);
    this.col.appendChild(this.card);
    this.libraryContainer.appendChild(this.col);
}

BookCardBuilder.prototype.addValues = function() {
    this.cardTitle.textContent = this.book.title;
    this.cardSubtitle.textContent = `by ${this.book.author}`;
    this.cardText.textContent = `${this.book.numberOfPages} pages`;
    this.readButton.dataset.id = this.book.id;
    this.removeButton.textContent = "Remove";
    this.removeButton.dataset.id = this.book.id;
    this.readButton.textContent = this.book.read ? "Read" : "Not read yet";
}

BookCardBuilder.prototype.stylize = function() {
    this.col.className = "col-md-3 p-2";

    this.cardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    this.card.className = "card book";
    this.cardTitle.className = "card-title";
    this.cardBody.className = "card-body";
    this.cardText.className = "card-text";
    this.readButton.className = "btn readBookButton";
    this.removeButton.className = "btn btn-outline-danger removeBookButton";
    this.cardFooter.className = "card-footer text-body-secondary d-flex justify-content-between";

    if (this.book.read) {
        this.card.classList.add('border-primary');
        this.readButton.classList.add('btn-outline-primary');
    } else {
        this.card.classList.add('border-secondary');
        this.readButton.classList.add('btn-outline-secondary');
    }
}

BookCardBuilder.prototype.display = function(){
    this.stylize();
    this.addValues();
    this.build();
}

function FormBuilder(titleInputId, authorInputId, numberOfPagesInputId, readCheckBoxId) {
    this.titleInput = document.getElementById(titleInputId);
    this.authorInput = document.getElementById(authorInputId);
    this.numberOfPagesInput = document.getElementById(numberOfPagesInputId);
    this.readInput = document.getElementById(readCheckBoxId);
}

FormBuilder.prototype.clean = function() {
    this.titleInput.value = "";
    this.authorInput.value = "";
    this.numberOfPagesInput.value = "";
    this.readInput.checked = false;
}

document.addEventListener('DOMContentLoaded', () => {
    const myLibrary = new Library();
    const libraryContainer = new LibraryContainerBuilder("library", myLibrary);
    const form = new FormBuilder('title', 'author', 'numberOfPages', 'read');

    const newBookFormClose = document.getElementById("newBookFormClose");
    const newBookForm = document.getElementById("newBookForm");

    myLibrary.initialize();
    libraryContainer.refresh();
    libraryContainer.initRemoveListener();
    libraryContainer.initToggleReadListener();

    newBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(newBookForm);

        myLibrary.addBook(data.get('title'), data.get('author'), data.get('numberOfPages'), data.get('read') === 'on');
        newBookFormClose.click();
        libraryContainer.refresh();
        form.clean();
    });
});



