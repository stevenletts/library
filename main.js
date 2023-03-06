import "./style.css";

let myLibrary = [];

const submit = document.getElementById("submit-book");
submit.addEventListener("click", function (e) {
  e.preventDefault();
  let form = document.getElementById("book-form");
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  const book = new Book(title, author, pages, read);
  addBookToLibrary(book);
  console.log(myLibrary);
  displayBooks();
});

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `Title: ${this.title}, Author ${this.author}, Pages: ${this.pages}, Read: ${this.read}`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayBooks() {
  let tableBody = document.getElementById("books");
  for (let i = 0; i < myLibrary.length; i++) {
    // create row
    if (tableBody.rows.length > i + 1) {
      continue;
    }
    let row = tableBody.insertRow(-1);
    // create cells
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    // delete btn cell and delete btn logic
    let c5 = row.insertCell(4);

    let delBtn = document.createElement("button");
    delBtn.addEventListener("click", function () {
      let parent = delBtn.parentElement.parentElement;
      let rowIndex = parent.rowIndex;
      let bookTitle = parent.firstElementChild.innerText;
      deleteBook(bookTitle);
      tableBody.deleteRow(rowIndex);
    });

    // insert book object text
    c1.innerText = `${myLibrary[i].title}`;
    c2.innerText = `${myLibrary[i].author}`;
    c3.innerText = `${myLibrary[i].pages}`;
    c4.innerText = `${myLibrary[i].read}`;
    c5.appendChild(delBtn);
  }
}

function deleteBook(bookTitle) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title == bookTitle) {
      myLibrary.splice(i, 1);
      break;
    }
  }
}

displayBooks();
