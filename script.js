let myLibrary = [];

function Book(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
  
}

function libpane() {
    let libItem = document.querySelector(".lib");
    libItem.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let nbook = myLibrary[i];
        let pane = document.createElement("div");
        pane.setAttribute("class","libpanel")
        pane.innerHTML = `
        <div class="c1">
            <h3 class="title">${nbook.title}</h3> 
            <h5 class="author">by ${nbook.author}</h5> 
        </div>
        <div class="c2">
            <p>${nbook.pages} pages</p>
            <p class="isread">${nbook. isread ? "Read" : "Not Read Yet"} </p>
            <button class="submit" onclick="deleteBook(${i})"> Delete <button>
        </div>`;
        libItem.appendChild(pane);
    }
}

function deleteBook(index){
    console.log('0');
    myLibrary.splice(index,1);
    libpane();
}

function addMyBook() {
    let title = document.querySelector(".input1").value;
    let author = document.querySelector(".input2").value;
    let pages = document.querySelector(".input3").value;
    let isread = document.querySelector("#isread").checked;
    let bookAdded = new Book(title, author, pages, isread);
    console.log(bookAdded);
    myLibrary.push(bookAdded);
    libpane();
  
}    

let addbutton = document.querySelector(".addBook");

addbutton.addEventListener('click', function() {
    let addForm = document.querySelector(".left");
    addForm.style.display = 'block';
    addbutton.style.display = 'none'
});

let bookform = document.querySelector(".form");

bookform.addEventListener('submit', function(){

event.preventDefault();
addMyBook();
    
});