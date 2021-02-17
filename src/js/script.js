/* global Handlebars, utils, dataSource */
{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book'
    },

    list: {
      booksList: '.books-list',
      filterList: '.filters'
    }



  };


  const templates = Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML);

  const listOfBooks = document.querySelector(select.list.booksList);
  const filteredBook = document.querySelector(select.list.filterList);



  function render() {
    for (let parameters of dataSource.books) {
      const generateHTML = templates(parameters);

      const codeHTML = utils.createDOMFromHTML(generateHTML);

      listOfBooks.appendChild(codeHTML);

    }
  }
  render();



  const favoriteBooks = [];
  const filters = [];



  function initActions() {

    listOfBooks.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {

        const bookId = event.target.offsetParent.getAttribute('data-id');

        if (event.target.offsetParent.classList.contains('favorite')) {
          event.target.offsetParent.classList.remove('favorite');

          const searchedBook = favoriteBooks.indexOf(bookId);

          favoriteBooks.splice(searchedBook, 1);
        }
        else {
          event.target.offsetParent.classList.add('favorite');

          favoriteBooks.push(bookId);

        }
      }

    });

    filteredBook.addEventListener('click', function (event) {

      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {

        if (event.target.checked == true) {
          filters.push(event.target.value);
        } else {
          const kindOfBook = filters.indexOf(event.target.value);
          filters.splice(kindOfBook, 1);
        }
        filterBooks();
      }
      console.log('filters', filters);
    }
    );

  }
  initActions();



  function filterBooks() {

    for (let book of dataSource.books) {
      let shouldBeHidden = false;
      for (let filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');
      } else {
        document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
      }
    }
  };



}
