let myLibrary = [];

function Book(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
  
}

function addMyBook() {
    let title = document.querySelector(".Title").value;
    let author = document.querySelector(".Author").value;
    let pages = document.querySelector(".Pages").value;
    let isread = document.querySelector(".isread").checked;
    let bookAdded = Book(title, author, pages, isread);
  
}    

let addbutton = document.querySelector("#addBook");

addbutton.addEventListener('click', function() {
    console.log("work");
    let addForm = document.querySelector(".form");
    addForm.style.display = 'block';
    addbutton.style.display = 'none'
});

let bookform = document.querySelector(".form");

bookform.addEventListener('submit', function(){
    
})