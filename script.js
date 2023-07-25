var myLibrary = [];
var title = document.getElementById('title');
var author = document.getElementById('author');
var pages = document.getElementById('pages');
var submitForm = document.getElementById('submit-form');

function Book(title, author, pages, isread) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isread = isread;
}

function addMyBook() {
    let titleValue = title.value;
    let authorValue = author.value;
    let pagesValue = pages.value;
    let isreadValue = isread.checked;
    let bookAdded = new Book(titleValue, authorValue, pagesValue, isreadValue);
    myLibrary.push(bookAdded);
    // libpane();
}

// addbutton.addEventListener('click', function() {
//     let addForm = document.querySelector(".left");
//     addForm.style.display = 'block';
//     addbutton.style.display = 'none'
// });

// (function() {
//     title.addEventListener('keydown', () => { submitForm.setAttribute('disabled', title.value == "" && author.value == "" && pages == "") });
//     author.addEventListener('keydown', () => { submitForm.setAttribute('disabled', title.value == "" && author.value == "" && pages == "") });
//     pages.addEventListener('keydown', () => { submitForm.setAttribute('disabled', title.value == "" && author.value == "" && pages == "") });

// })();

// (function() {
//     alert("Parentheses around the whole thing");
// }());



// submitForm.addEventListener('click', function(){
//     addMyBook();
//     console.log(myLibrary);
// });



// function libpane() {
//     let libItem = document.querySelector(".lib");
//     libItem.innerHTML = "";
//     for(let i = 0; i < myLibrary.length; i++){
//         let nbook = myLibrary[i];
//         let pane = document.createElement("div");
//         pane.setAttribute("class","libpanel");
//         pane.innerHTML = `
//         <div class="">
//             <h3 class="title">${nbook.title}</h3> 
//             <h5 class="author">by ${nbook.author}</h5> 
//         </div>
//         <div class="c2">
//             <p>${nbook.pages} pages</p>
//             <button class="isread">${nbook.isread ? "Read" : "Not Read Yet"} </p>
//             <button class="delete" onclick="deleteBook(${i})"> Delete <button>

//         </div>`;
//     libItem.appendChild(pane);
//     }
// }


// let readbutton = document.querySelector(".isread");
// readbutton.addEventListener('click', function(){


// if(nbook.isread ="Read"){
//     nbook.isread ="Not Read Yet";
// }else{
//     nbook.isread ="Read";
// }
// libpane();
// });


// function deleteBook(i){
//     myLibrary.splice(i,1);
//     libpane();
// }


