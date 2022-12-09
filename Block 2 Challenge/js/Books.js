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
      const error = util.qs('.error');
      error.innerHTML = '';
      const isbn = util.qs('#add-isbn').value;

      const savedIsbn = bookList.find(i => i.isbn === isbn);

      if (savedIsbn && isbn === savedIsbn.isbn) {
         error.innerHTML = `<p>**This book is already on your digital bookshelf.**</p> 
                                 <p>ISBN: ${isbn}</p>`;
         util.qs('#add-isbn').value = '';
      } else {
         const bookByIsbn = await util.fetchBook(
            this.baseUrl + `/isbn/${isbn}.json`
         )
         if (bookByIsbn !== undefined) {
            //console.log(bookByIsbn);
            renderAddBook(bookByIsbn);
         } else {
            error.innerHTML = `<p>**Oops! Something went wrong. Please try again.**</p>`;
            util.qs('#add-isbn').value = '';
         }
      }

   }

   addBook() {
      const isbn = util.qs('#isbn span').innerHTML;
      const title = util.qs('#title span').innerHTML;
      const author = util.qs('#author span').innerHTML;
      const pages = util.qs('#pages span').innerHTML;
      const comments = util.qs('#comments').value;
      const genre = util.qs('input[name="genre"]:checked').value;
      const readingLevel = util.qs('input[name="reading-level"]:checked').value;
      const coverUrl = util.qs('#book-cover').src;
      const published = util.qs('#published span').innerHTML;

      const book = {
         isbn: isbn,
         title: title,
         author: author,
         pages: pages,
         genre: genre,
         readingLevel: readingLevel,
         comments: comments,
         coverUrl: coverUrl,
         published: published
      }

      saveBook(this.key, book);
      this.showBooks();
      util.qs('#add').disabled = true;
      util.qs('#add-isbn').value = '';
   }

   removeBook(e) {
      const id = util.qs('.book-detail-items').id;

      if (e.target && e.target.matches("button#remove")) {
         bookList.splice(bookList.findIndex(book => book.isbn === id), 1);
         ls.writeToLS(this.key, bookList);
         this.showBooks();
      }
   }

   showBooks() {
      const home = util.qs('#home-page');
      home.classList.remove('hidden');

      const bookDetails = util.qs('#book-details');
      bookDetails.classList.add('hidden');

      const addBook = util.qs('#add-page');
      addBook.classList.add('hidden');

      const clearSearch = util.qs('#search-text');
      clearSearch.value = '';
      closeFilter();

      bookList = getBookList(this.key);
      renderBookList(bookList);
      this.addBookListenter();

   }

   searchBookList(e) {
      const searchText = document.getElementById('search-text').value.toLowerCase();
      closeFilter();
      const newBookList = bookList.filter(book =>
         book.title.toLowerCase().includes(searchText) ||
         book.isbn === searchText ||
         book.author.toLowerCase().includes(searchText));

      renderBookList(newBookList);
      this.addBookListenter();

   }

   filterBookList() {
      const readingLevel = util.qs('input[name="reading-level"]:checked').value.toLowerCase();
      const genre = util.qs('input[name="genre"]:checked').value.toLowerCase();

      let genreList = genre === 'null' ? bookList :
         bookList.filter(book => genre === book.genre.toLowerCase());

      let readingList = readingLevel === 'null' ? genreList :
         genreList.filter(book => readingLevel === book.readingLevel.toLowerCase());

      renderBookList(readingList);
      this.addBookListenter();

      closeFilter();
   }

   showBookDetails(book) {
      const home = util.qs('#home-page');
      home.classList.add('hidden');

      const bookDetails = util.qs('#book-details');
      bookDetails.classList.remove('hidden');

      renderBookDetails(book);
   }

   addListeners() {
      const addPage = util.qs('#add-button');
      util.onClick(addPage, addPageClass);

      const searchIsbn = util.qs('#search-isbn');
      util.onClick(searchIsbn, this.getBookByIsbn.bind(this));

      const addBook = util.qs('#add');
      util.onClick(addBook, this.addBook.bind(this));

      const remove = util.qs('#remove');
      util.onClick(remove, this.removeBook.bind(this));

      const searchBookList = util.qs('#search-text');
      searchBookList.addEventListener('keyup', this.searchBookList.bind(this));

      const filterBooks = util.qs('#filter');
      util.onClick(filterBooks, showFilter);

      const apply = util.qs('.apply-filter');
      util.onClick(apply, this.filterBookList.bind(this));

      const close = util.qs('.close-filter');
      util.onClick(close, closeFilter);

      const reset = util.qs('#reset');
      util.onClick(reset, this.showBooks.bind(this));
   }

   addBookListenter() {
      const bookDetails = util.qs('#books');
      const bookArray = Array.from(bookDetails.children);
      bookArray.forEach(book => {
         book.addEventListener('click', e => {
            this.showBookDetails(e.currentTarget.id)
         });
      });
   }
}

function addPageClass() {
   const home = util.qs('#home-page');
   home.classList.add('hidden');

   const add = util.qs('#add-page');
   add.classList.remove('hidden');

   const addDetails = util.qs('#search-results');
   addDetails.innerHTML = '';
}

function showFilter() {
   const filter = util.qs('.filter');
   filter.classList.remove('hidden');
}

function closeFilter() {
   const filter = util.qs('.filter');
   filter.classList.add('hidden');
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
      return bookList
   }
   return bookList;
}



function renderBookList(bookList, page) {
   const books = util.qs('#books');
   books.innerHTML = '';
   

   bookList.forEach(book => {
      const bookLink = document.createElement('li');
      bookLink.setAttribute('id', `${book.isbn}`);
      bookLink.setAttribute('class', 'single-book');
      bookLink.innerHTML = `<img src="${book.coverUrl}" alt="book cover">
      <p class="book-title">${book.title}</p>`
      books.append(bookLink);
   });
}

function renderBookDetails(bookId) {
   const oneBook = bookList.find(book => book.isbn === bookId);
   const bookDetails = util.qs('.book-detail-items');
   bookDetails.setAttribute('id', `${oneBook.isbn}`);
   bookDetails.innerHTML =
      `<div class="book-text">
   <h2>${oneBook.title}</h2>
   <p><span>Author: </span>${oneBook.author}</p>
   <p><span>Published: </span>${oneBook.published}</p>
   <p><span># of Pages: </span>${oneBook.pages}</p>
   <p><span>Genre: </span>${oneBook.genre}</p>
   <p><span>Reading Level: </span> ${oneBook.readingLevel}</p>
   <p><span>Comments: </span>: ${oneBook.comments}</p>
   </div>
   <img src="${oneBook.coverUrl}" atl="bookshelf">`
}

async function renderAddBook(book) {
   let bookInfo = util.qs('#search-results')

   bookInfo.innerHTML = '';
   let author = '';

   if (book.by_statement && book.by_statement !== undefined) {
      author = book.by_statement;
   } else if (book.authors) {
      let authorName = await util.fetchBook(`https://openlibrary.org${book.authors[0].key}.json`);
      console.log(authorName);
      author = authorName.name;
   } else {
      author = "Unknown";
   }

   bookInfo.innerHTML = `<form class="search-results">
   <section class="search-info">
      <div class="search-titles">
         <p id="isbn">ISBN: <span class="search-text">${book.isbn_13 || book.isbn_10}</span></p>
         <p id="title">Title: <span class="search-text">${book.title}</span></p>
         <p id="author">Author: <span class="search-text">${author}</span></p>
         <p id="published">Published: <span class="search-text">${book.published_date}</span></p>
         <p id="pages"># of Pages: <span class="search-text">${book.number_of_pages}</span></p>
      </div>

   </section>
   <div class="genre-list">
      <h3>Genre:</h3>
      <label for="fiction">
         <input type="radio" id="fiction" name="genre" value="Fiction">
         Fiction</label>

      <label for="non-fiction">
         <input type="radio" id="non-fiction" name="genre" value="Non-fiction">
         Non-fiction</label>

      <label for="historical">
         <input type="radio" id="historical" name="genre" value="Historical">
         Historical</label>

      <label for="religious">
         <input type="radio" id="religious" name="genre" value="Religious">
         Religious</label>

      <label for="mystery">
         <input type="radio" id="mystery" name="genre" value="Mystery">
         Mystery</label>

      <label for="fantasy">
         <input type="radio" id="fantasy" name="genre" value="Fantasy">
         Fantasy</label>

      <label for="romance">
         <input type="radio" id="romance" name="genre" value="Romance">
         Romance</label>

   </div>

   <div class="reading-level-list">
      <h3>Reading Level:</h3>
      <label for="adult">
         <input type="radio" id="adult" name="reading-level" value="Adult">
         Adult</label>

      <label for="teen">
         <input type="radio" id="teen" name="reading-level" value="Teen">
         Teen</label>

      <label for="middle-school">
         <input type="radio" id="middle-school" name="reading-level" value="Middle-school">
         Middle-School</label>

      <label for="child">
         <input type="radio" id="child" name="reading-level" value="Child">
         Children</label>
   </div>

   <label for="comments">Comments:</label>
   <textarea name="comments" id="comments"></textarea>
</form>`

   const cover = util.qs('.search-info');
   const isbnCover = util.qs('#add-isbn').value;

   if (book.covers) {
   const img = await util.fetchImage(`https://covers.openlibrary.org/b/isbn/${isbnCover}-L.jpg`);
   img.setAttribute('id', 'book-cover');
   cover.appendChild(img);
   } else {
     const img = document.createElement('img');
     img.setAttribute('src', './images/icons8-no-image-50.png');
     img.setAttribute('id', 'book-cover');
     cover.appendChild(img);
   }

   util.qs('#add').disabled = false;

}