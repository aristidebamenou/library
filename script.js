import { faker } from "https://esm.sh/@faker-js/faker@v10.3.0";

const INITIAL_BOOKS_COUNT = 10;
const MAX_PAGES = 5;

class Book {

    #id = crypto.randomUUID();
    #title;
    #author;
    #numberOfPages;
    #read;

    constructor(title, author, numberOfPages, read) {
        this.#title = title;
        this.#author = author;
        this.#numberOfPages = numberOfPages;
        this.#read = read;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    get author() {
        return this.#author;
    }

    set author(author) {
        this.#author = author;
    }

    get numberOfPages() {
        return this.#numberOfPages;
    }

    set numberOfPages(numberOfPages) {
        this.#numberOfPages = numberOfPages;
    }

    get read() {
        return this.#read;
    }

    toggleRead = () => {
        this.#read = !this.#read;
    }
}

class BookCardBuilder {

    #book;
    #libraryContainer;
    #col = document.createElement("div");
    #card = document.createElement("div");
    #cardTitle = document.createElement("h5");
    #cardSubtitle = document.createElement("h6");
    #cardBody = document.createElement("div");
    #cardText = document.createElement("p");
    #cardFooter = document.createElement("div");
    #readButton = document.createElement("button");
    #removeButton = document.createElement("button");

    constructor(libraryContainer, book) {
        this.#book = book;
        this.#libraryContainer = libraryContainer;
    }

    get book() {
        return this.#book;
    }

    get libraryContainer() {
        return this.#libraryContainer;
    }

    get col() {
        return this.#col;
    }

    get card() {
        return this.#card;
    }

    get cardTitle() {
        return this.#cardTitle;
    }

    get cardSubtitle() {
        return this.#cardSubtitle;
    }

    get cardBody() {
        return this.#cardBody;
    }

    get cardText() {
        return this.#cardText;
    }

    get cardFooter() {
        return this.#cardFooter;
    }

    get readButton() {
        return this.#readButton;
    }

    get removeButton() {
        return this.#removeButton;
    }

    build = () => {
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

    addValues = () => {
        this.cardTitle.textContent = this.book.title;
        this.cardSubtitle.textContent = `by ${this.book.author}`;
        this.cardText.textContent = `${this.book.numberOfPages} pages`;
        this.readButton.dataset.id = this.book.id;
        this.removeButton.textContent = "Remove";
        this.removeButton.dataset.id = this.book.id;
        this.readButton.textContent = this.book.read ? "Read" : "Not read yet";
    }

    stylize = () => {
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

    display = () => {
        this.stylize();
        this.addValues();
        this.build();
    }
}

class Library {

    #books = []

    constructor(initialBookCount = INITIAL_BOOKS_COUNT) {
        for (let i = 0; i < initialBookCount; i++) {
            let book = new Book(faker.book.title(), faker.book.author(), Math.floor(Math.random() * MAX_PAGES), Math.random() < 0.5)
            this.addBook(book);
        }
    }

    get books() {
        return this.#books;
    }

    addBook = (book) => {
         if (!book instanceof(Book)) {
             throw 'addBook() needs a `book` parameter.'
        }
        this.#books.push(book);
    }

    findBookIndex = (bookId) => {
        return this.books.findIndex(book => book.id === bookId);
    }

    removeBook = (bookId) => {
        const index = this.findBookIndex(bookId);
        if (index < 0) {
            throw 'removeBook() needs a `bookId` with positive index.'
        }

        this.books.splice(index, 1);
    }

    toggleBookRead = (bookId) => {
        const index = this.findBookIndex(bookId);
        if (index < 0) {
            throw 'toggleBookRead() needs a `bookId` with positive index.'
        }

        let book = this.books[index];
        book.toggleRead();
    }

    mapBooks = (callback) => {
        this.books.forEach(book => callback(book));
    }
}

class LibraryContainerBuilder {

    #libraryContainer;
    #library;

    constructor(libraryContainerId, library) {
        this.#library = library;
        this.#libraryContainer = document.getElementById(libraryContainerId);
    }

    get library() {
        return this.#library;
    }

    get libraryContainer() {
        return this.#libraryContainer;
    }

    display = () => {
        this.library.mapBooks((book) => {
            const bookCard = new BookCardBuilder(this.libraryContainer, book);
            bookCard.display();
        });
    }

    refresh = () => {
        this.libraryContainer.innerHTML = "";
        this.display();
    }

    initRemoveListener = () => {
        document.addEventListener("click", (e) => {
            if(!e.target.classList.contains("removeBookButton")) return;

            this.library.removeBook(e.target.dataset.id);
            this.refresh();
        });
    }

    initToggleReadListener = () => {
        document.addEventListener("click", (e) => {
            if(!e.target.classList.contains("readBookButton")) return;

            this.library.toggleBookRead(e.target.dataset.id);
            this.refresh();
        });
    }
}

class FormBuilder {

    #titleInput;
    #authorInput;
    #numberOfPagesInput;
    #readInput;

    constructor(titleInputId, authorInputId, numberOfPagesInputId, readCheckBoxId) {
        this.#titleInput = document.getElementById(titleInputId);
        this.#authorInput = document.getElementById(authorInputId);
        this.#numberOfPagesInput = document.getElementById(numberOfPagesInputId);
        this.#readInput = document.getElementById(readCheckBoxId);
    }

    get titleInput() {
        return this.#titleInput;
    }

    get authorInput() {
        return this.#authorInput;
    }

    get numberOfPagesInput() {
        return this.#numberOfPagesInput;
    }

    get readInput() {
        return this.#readInput;
    }

    clean = () => {
        this.titleInput.value = "";
        this.authorInput.value = "";
        this.numberOfPagesInput.value = "";
        this.readInput.checked = false;
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const myLibrary = new Library();
    const libraryContainer = new LibraryContainerBuilder("library", myLibrary);
    const form = new FormBuilder('title', 'author', 'numberOfPages', 'read');

    const newBookFormClose = document.getElementById("newBookFormClose");
    const newBookForm = document.getElementById("newBookForm");

    libraryContainer.refresh();
    libraryContainer.initRemoveListener();
    libraryContainer.initToggleReadListener();

    newBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData(newBookForm);

        let book = new Book(data.get('title'), data.get('author'), data.get('numberOfPages'), data.get('read') === 'on');

        myLibrary.addBook(book);
        newBookFormClose.click();
        libraryContainer.refresh();
        form.clean();
    });
});



