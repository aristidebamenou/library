import { faker } from "https://esm.sh/@faker-js/faker@v10.3.0";

const myLibrary = [];

createLibrary();
displayLibrary();

function Book(title, author, numberOfPages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.read = read;
}

function createLibrary() {
    for (let i = 0; i < 15; i++) {
        addBookToLibrary(faker.book.title(), faker.book.author(), Math.floor(Math.random() * 800), Math.random() < 0.5)
    }
}

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i]);
    }
}

function addBookToLibrary(title, author, numberOfPages, read) {
    let book = new Book(title, author, numberOfPages, read);
    myLibrary.push(book);
}

function displayBook(book) {
    let libraryMain = document.getElementById("library");

    let libraryCol = document.createElement("div");
    libraryCol.className = "col-md-3 p-2"

    let bookCard = document.createElement("div");
    bookCard.className = "card book"

    let bookCardBody = document.createElement("div");
    bookCardBody.className = "card-body";

    let bookCardTitle = document.createElement("h5");
    bookCardTitle.className = "card-title";
    bookCardTitle.innerText = book.title;

    let bookCardSubtitle = document.createElement("h6");
    bookCardSubtitle.className = "card-subtitle mb-2 text-body-secondary";
    bookCardSubtitle.innerText = `by ${book.author}`;

    let bookCardText = document.createElement("p");
    bookCardText.className = "card-text";
    bookCardText.innerText = `${book.numberOfPages} pages`;

    let bookCardFooter = document.createElement("div");
    bookCardFooter.className = "card-footer text-body-secondary text-end";

    if(book.read) {
        bookCard.className = `${bookCard.className} border-primary`;
        bookCardFooter.className = `${bookCardFooter.className} text-bg-primary`;
        bookCardFooter.innerText = "Read"
    } else {
        bookCard.className = `${bookCard.className} border-secondary`;
        bookCardFooter.className = `${bookCardFooter.className} text-bg-secondary`;
        bookCardFooter.innerText = "Not read yet"
    }

    bookCardBody.appendChild(bookCardTitle);
    bookCardBody.appendChild(bookCardSubtitle);
    bookCardBody.appendChild(bookCardText);
    bookCard.appendChild(bookCardBody);
    bookCard.appendChild(bookCardFooter);
    libraryCol.appendChild(bookCard);
    libraryMain.appendChild(libraryCol);
}
