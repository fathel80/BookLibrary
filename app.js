//Book Class: Represents a book 
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn;
  }
}

//UI Class: Handle UI Tasks
class UI {
  static displaybooks() {
    const books = Store.getBooks();
    

    books.forEach((book) => UI.addBookToLibrary(book));
  }

  static addBooktoLibrary(book) {
    const list = document.querySelector('#book-library');

    const row = document.createElement('tr');

    row.innerHTML =` 
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if(el.classLibrary.contains('delete')) {
      el.parentElement.parentElement.remove();
    }

  }
  
  static showAlert(message,className) {
    const div = document.createElement('div');
    div.className = `alert ${className}` ;
    div.appendChild(document.createTextNode(message));
    const container= document.querySelector('.container');const form= document.querySelector('#book-form');
    container.insertBefore(div, form);
    
    //Vanish in 3 seconds
    setTimeout(() => document.querySelecter('.alert').remover(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

//Store Class: Handles Storage 
class Store{
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;

  }
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListner('DOMContentLoaded', UI.displayBooks);
//Event: Add a Book
document.querySelector('#book-form').addEventListner('submit', (e) => {
  //prevent actual submit
  e.preventDefault();
  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

    //Validate
    if(title === '' || author === '' || isbn === '') {
      UI.showAlert('Please fill in all field', 'danger');
    } else {
      //Instatiate book
    const book = new book(title, author, isbn);

    // Add Book to UI
    UI.addBooktoLibrary(book)

    // add book to Store
    Store.addBook(book);

    // Show Success message
    UI.showAlert('Book Added', 'Success');
 
    //Clear fields
    UI.clearFields();
    

    }
});
//Event: remove a Book
document.querySelector('#book-library').addEventListner('click', (e) => {
  //Remove book from UI
  UI.deletebook(e.target);

  // Remove book from Store
  Store.removeBook(e.target.parenElementSibling.textContent);

  // Show Success message
  UI.showAlert('Book Remove', 'Success');
});