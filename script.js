import { faker } from "https://esm.sh/@faker-js/faker@v10.3.0";

function Book(title, author, numberOfPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;

    this.toggleRead = function() {
        this.read = !this.read;
    }

    this.display = function() {
        let libraryMain = document.getElementById("library");

        let libraryCol = document.createElement("div");
        libraryCol.className = "col-md-3 p-2"

        let bookCard = document.createElement("div");
        bookCard.className = "card book"

        let bookCardBody = document.createElement("div");
        bookCardBody.className = "card-body";

        let bookCardTitle = document.createElement("h5");
        bookCardTitle.className = "card-title";
        bookCardTitle.innerText = this.title;

        let bookCardSubtitle = document.createElement("h6");
        bookCardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
        bookCardSubtitle.innerText = `by ${this.author}`;

        let bookCardText = document.createElement("p");
        bookCardText.className = "card-text";
        bookCardText.innerText = `${this.numberOfPages} pages`;

        let bookCardFooter = document.createElement("div");
        bookCardFooter.className = "card-footer text-body-secondary d-flex justify-content-between";

        let readButton = document.createElement("button");
        readButton.dataset.id = this.id;
        readButton.className = "btn readBookButton";

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Remove";
        deleteButton.dataset.id = this.id;
        deleteButton.className = "btn btn-outline-danger removeBookButton";

        bookCardFooter.appendChild(readButton);
        bookCardFooter.appendChild(deleteButton);

        if(this.read) {
            bookCard.className = `${bookCard.className} border-primary`;
            readButton.className = `${readButton.className} btn-outline-primary`;
            readButton.innerText = "Read"
        } else {
            bookCard.className = `${bookCard.className} border-secondary`;
            readButton.className = `${readButton.className} btn-outline-secondary`;
            readButton.innerText = "Not read yet"
        }

        bookCardBody.appendChild(bookCardTitle);
        bookCardBody.appendChild(bookCardSubtitle);
        bookCardBody.appendChild(bookCardText);
        bookCard.appendChild(bookCardBody);
        bookCard.appendChild(bookCardFooter);
        libraryCol.appendChild(bookCard);
        libraryMain.appendChild(libraryCol);
    }
}

function Library() {
    this.books = [];

    this.initialize = function() {
        for (let i = 0; i < 8; i++) {
            this.addBook(faker.book.title(), faker.book.author(), Math.floor(Math.random() * 800), Math.random() < 0.5)
        }
    }

    this.display = function() {
        for (let i = 0; i < this.books.length; i++) {
            this.books[i].display();
        }
    }

    this.addBook = function(title, author, numberOfPages, read) {
        let book = new Book(title, author, numberOfPages, read);
        this.books.push(book);
    }

    this.findBookIndex = function(bookId) {
        return this.books.findIndex(book => book.id === bookId);
    }

    this.refresh = function() {

        let libraryMain = document.getElementById("library");
        libraryMain.innerHTML = "";
        this.display();
    }

    this.deleteBook = function() {
        document.addEventListener("click", (e) => {
            if(!e.target.classList.contains("removeBookButton")) {
                return;
            }
            this.books.splice(this.findBookIndex(e.target.dataset.id), 1);
            this.refresh();
        });
    }

    this.toggleBookRead = function() {
        document.addEventListener("click", (e) => {
            if(!e.target.classList.contains("readBookButton")) {
                return;
            }
            this.books[this.findBookIndex(e.target.dataset.id)].toggleRead();
            this.refresh();
        });
    }
}

function cleanFormInputs() {
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let numberOfPagesInput = document.getElementById("numberOfPages");
    let readInput = document.getElementById("read");

    titleInput.value = "";
    authorInput.value = "";
    numberOfPagesInput.value = "";
    readInput.checked = false;
}

document.addEventListener('DOMContentLoaded', () => {
    let myLibrary = new Library();

    let newBookFormClose = document.getElementById("newBookFormClose");
    let newBookForm = document.getElementById("newBookForm");

    myLibrary.initialize();
    myLibrary.refresh();
    myLibrary.deleteBook();
    myLibrary.toggleBookRead();

    newBookForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let data = new FormData(newBookForm);

        myLibrary.addBook(data.get('title'), data.get('author'), data.get('numberOfPages'), data.get('read') === 'on');
        newBookFormClose.click();
        myLibrary.refresh();
        cleanFormInputs();
    });
});



