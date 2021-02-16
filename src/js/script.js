/* global Handlebars, utils, dataSource */
{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book'
    },

    list: {
      booksList: '.books-list'
    }

  };


  const templates = Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML);

  const listOfBooks = document.querySelector(select.list.booksList);




  function render() {
    for (let parameters of dataSource.books) {
      const generateHTML = templates(parameters);

      const codeHTML = utils.createDOMFromHTML(generateHTML);

      listOfBooks.appendChild(codeHTML);

    }
  }
  render();




  const favoriteBooks = [];
  const coverOfBook = listOfBooks.querySelectorAll('.book__image');


  function initActions() {
    for (let cover of coverOfBook) {
      cover.addEventListener('dblclick', function (event) {
        event.preventDefault();
        cover.classList.add('favorite');
        const bookId = cover.getAttribute('data-id');

        favoriteBooks.push(bookId);
      });
    }
  }
  initActions();
  console.log('favoriteBooks', favoriteBooks);

}
