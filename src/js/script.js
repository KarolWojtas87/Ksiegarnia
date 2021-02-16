/* global Handlebars, utils, dataSource */
{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book'
    },

    list: {
      books: '.books-list'
    },
  };


  const templates = Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML);

  const listOfBooks = document.querySelector(select.list.books);

  function render() {
    for (let parameters of dataSource.books) {
      const generateHTML = templates(parameters);

      const codeHTML = utils.createDOMFromHTML(generateHTML);

      listOfBooks.appendChild(codeHTML)

    }
  }
  render();

}
