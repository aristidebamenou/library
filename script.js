let myLibrary = [];

function Book(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
  
}

function addMyBook() {
    let title = document.getElementById("Title").value;
    let author = document.getElementById("Author").value;
    let pages = document.getElementById("Pages").value;
    let isread = document.getElementById("isread").checked;
    let bookAdded = Book(title, author, pages, isread);
  
}    

let addbutton = document.getElementById("addBook");

addbutton.addEventListener('click', function() {
    console.log("work");
    let addForm = document.getElementById("form");
    addForm.style.display = 'block';
    addbutton.style.display = 'none'
});

let bookform = document.querySelector(".form");

bookform.addEventListener('submit', function(){
    
    alert('Hello')
})