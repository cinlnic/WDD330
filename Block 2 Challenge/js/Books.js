import * as ls from './ls.js';
import * as util from './utilities.js';

let bookList = null;

export default class Books {
   constructor(key) {
      this.key = key;
      this.baseUrl = 'https://openlibrary.org';

      this.addListeners();
   }

   async getBookByIsbn() {
      const isbn = util.qs('#add-isbn').value;
      const bookByIsbn = await util.fetchBook(
         this.baseUrl + `/isbn/${isbn}.json`
      )
      console.log(bookByIsbn);
      createBookInfo(bookByIsbn);
   }

   addBook() {
      const isbn = util.qs('#isbn span').innerHTML;
      console.log(isbn);

      const title = util.qs('#title span').innerHTML;
      const author = util.qs('#author span').innerHTML;
      const pages = util.qs('#pages span').innerHTML;
      const comments = util.qs('#comments').value;
      const genre = util.qs('input[name="genre"]:checked').value;
      const readingLevel = util.qs('input[name="reading-level"]:checked').value;
      const coverUrl = util.qs('#book-cover').src;

      const book = {
         isbn: isbn, 
         title: title, 
         author: author, 
         pages: pages, 
         genre: genre, 
         readingLevel: readingLevel, 
         comments: comments,
         coverUrl: coverUrl
      }
      console.log(book);
     
      saveBook(this.key, book);
   }

   showBooks(){
      bookList = getBookList(this.key);
      renderBookList(bookList);
   }

   addListeners() {
      const addPage = util.qs('#add-button');
      util.onClick(addPage, addPageClass);

      const searchIsbn = util.qs('#search-isbn');
      util.onClick(searchIsbn, this.getBookByIsbn.bind(this));

      const addBook = util.qs('#add');
      util.onClick(addBook, this.addBook.bind(this))
   }
}

function addPageClass() {
   const home = util.qs('#home-page');
   home.classList.add('hidden');

   const add = util.qs('#add-page');
   add.classList.remove('hidden');
}

function saveBook(key, book) {
   const newBook = book
   console.log(bookList);
   bookList.push(newBook);
   ls.writeToLS(key, bookList);
}

function getBookList(key) {
   if (bookList === null) {
      bookList = ls.readFromLS(key);
      return bookList;
   }
   return bookList;
}

async function fetchImage(url) {
   const img = new Image();
   return new Promise((res, rej) => {
      img.onload = () => res(img);
      img.onerror = e => rej(e);
      img.src = url;
   });
}

async function createBookInfo(book) {
   const isbn = util.qs('#isbn span');
   const title = util.qs('#title span');
   const author = util.qs('#author span');
   const cover = util.qs('.search-info');
   const pages = util.qs('#pages span');
   let authorName = '';

   isbn.innerHTML = `${book.isbn_13}`;
   title.innerHTML = `${book.title}`;
   pages.innerHTML = `${book.number_of_pages}`;

   if (book.by_statement !== undefined) {
      author.innerHTML = `${book.by_statement}`;
   } else {
      authorName = await util.fetchBook(`https://openlibrary.org${book.authors[0].key}.json`);
      console.log(authorName);
      author.innerHTML = authorName.name;
   }

   const isbnCover = util.qs('#add-isbn').value;
   const img = await fetchImage(`https://covers.openlibrary.org/b/isbn/${isbnCover}-L.jpg`);
   img.setAttribute('id', 'book-cover');
   cover.appendChild(img);
}

function renderBookList(bookList) {
   const books = util.qs('#books');
   books.innerHTML = '';
   bookList.forEach(book => {
      const bookLink = document.createElement('a');
      bookLink.setAttribute('id', `${book.title}`);
      bookLink.setAttribute('class', 'single-book');
      bookLink.innerHTML = `<img src="${book.coverUrl}" alt="book cover">
      <p class="book-title">${book.title}</p>`
      books.append(bookLink);

      bookLink.addEventListener('click', renderBookDetails);
   });
}

function renderBookDetails() {
   console.log('it works');
}
