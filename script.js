let myLibrary = [];

function Book(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
  
}

function addMyBook() {
    let title = document.querySelector(".input1").value;
    let author = document.querySelector(".input2").value;
    let pages = document.querySelector(".input3").value;
    let isread = document.querySelector("#isread").checked;
    let bookAdded = new Book(title, author, pages, isread);
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

function libpane() {
    let libItem = document.querySelector(".lib");
    libItem.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let nbook = myLibrary[i];
        let pane = document.createElement("div");
        pane.setAttribute("class","libpanel");
        pane.innerHTML = `
        <div class="">
            <h3 class="title">${nbook.title}</h3> 
            <h5 class="author">by ${nbook.author}</h5> 
        </div>
        <div class="c2">
            <p>${nbook.pages} pages</p>
            <button class="isread">${nbook.isread ? "Read" : "Not Read Yet"} </p>
            <button class="delete" onclick="deleteBook(${i})"> Delete <button>

        </div>`;
    libItem.appendChild(pane);
    }
}


let readbutton = document.querySelector(".isread");
readbutton.addEventListener('click', function(){


if(nbook.isread ="Read"){
    nbook.isread ="Not Read Yet";
}else{
    nbook.isread ="Read";
}
libpane();
});


function deleteBook(i){
    myLibrary.splice(i,1);
    libpane();
}


