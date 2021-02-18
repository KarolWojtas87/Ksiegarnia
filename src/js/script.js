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


  class BooksList {
    constructor() {
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.render();

      thisBook.initActions();

    }

    initData() {
      const thisBook = this;
      thisBook.data = dataSource.books;
    }

    getElements() {
      const thisBook = this;

      thisBook.favoriteBooks = [];
      thisBook.filters = [];
      thisBook.listOfBooks = document.querySelector(select.list.booksList);
      thisBook.filteredBook = document.querySelector(select.list.filterList);


    }

    render() {
      const thisBook = this;
      for (let parameters of thisBook.data) {

        parameters.ratingBgc = thisBook.determineRatingBgc(parameters.rating);
        parameters.ratingWidth = parameters.rating * 10;
        const generateHTML = templates(parameters);
        const codeHTML = utils.createDOMFromHTML(generateHTML);

        thisBook.listOfBooks.appendChild(codeHTML);
      }
    }

    initActions() {
      const thisBook = this;
      thisBook.listOfBooks.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {

          const bookId = event.target.offsetParent.getAttribute('data-id');

          if (event.target.offsetParent.classList.contains('favorite')) {
            event.target.offsetParent.classList.remove('favorite');

            const searchedBook = thisBook.favoriteBooks.indexOf(bookId);

            thisBook.favoriteBooks.splice(searchedBook, 1);
          }
          else {
            event.target.offsetParent.classList.add('favorite');

            thisBook.favoriteBooks.push(bookId);

          }
        }

      });

      thisBook.filteredBook.addEventListener('click', function (event) {

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {

          if (event.target.checked == true) {
            thisBook.filters.push(event.target.value);
          } else {
            const kindOfBook = thisBook.filters.indexOf(event.target.value);
            thisBook.filters.splice(kindOfBook, 1);
          }

        }
        thisBook.filterBooks();
      }
      );

    }

    filterBooks() {
      const thisBook = this;
      for (let book of dataSource.books) {
        let shouldBeHidden = false;
        for (let filter of thisBook.filters) {
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
    }

    determineRatingBgc(rating) {
      let background = ' ';
      if (rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }
  }
  const app = new BooksList();
}



