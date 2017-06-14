import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const books = [
  {
    id: "someId",
    title: "Camino Island",
    watchHref: "https://prodimage.images-bn.com/pimages/9780385543026_p0_v4_s460x700.jpg",
    author: "John Grisham",
    date: "06/06/2017"
  },
  {
    id: "someId1",
    title: "Make Your Bed: Little Things That Can Change Your Life...And Maybe the World",
    watchHref: "https://prodimage.images-bn.com/pimages/9781455570249_p0_v4_s494x700.jpg",
    author: "William H. McRaven",
    date: "04/04/2017"
  },
  {
    id: "someId2",
    title: "Astrophysics for People in a Hurry",
    watchHref: "https://prodimage.images-bn.com/pimages/9780393609394_p0_v4_s431x700.jpg",
    author: "Neil deGrasse Tyson",
    date: "05/02/2017"
  },
  {
    id: "someId3",
    title: "Al Franken, Giant of the Senate",
    watchHref: "https://prodimage.images-bn.com/pimages/9781455540419_p0_v1_s463x700.jpg",
    author: "Al Franken",
    date: "05/30/2017"
  },
  {
    id: "someId4",
    title: "Gravity Falls: Journal 3 Special Edition",
    watchHref: "https://prodimage.images-bn.com/pimages/9781368002509_p0_v2_s542x700.jpg",
    author: "Alex Hirsch, Rob Renzetti, Andy Gonsalves, Stephanie Ramirez",
    date: "06/13/2017"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (book) => {
  return replaceAll(book.title, ' ', '-');
};

class BookApi {
  static getAllBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], books));
      }, delay);
    });
  }

  static saveBook(book) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minBookTitleLength = 1;
        if (book.title.length < minBookTitleLength) {
          reject(`Title must be at least ${minBookTitleLength} characters.`);
        }

        if (book.id) {
          const existingBookIndex = books.findIndex(a => a.id == book.id);
          books.splice(existingBookIndex, 1, book);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new books in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          book.id = generateId(book);
          book.watchHref = 'https://d30y9cdsu7xlg0.cloudfront.net/png/1009-200.png';
          books.push(book);
        }

        resolve(Object.assign({}, book));
      }, delay);
    });
  }

  static deleteBook(bookId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfBookToDelete = books.findIndex(book => {
          book.bookId == bookId;
        });
        books.splice(indexOfBookToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default BookApi;
