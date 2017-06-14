import React, {PropTypes} from 'react';
import BookListRow from './BookListRow';

const BookList = ({books, deleteBook}) => {
  window.books = books;
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>date</th>
        <th>remove</th>
      </tr>
      </thead>
      <tbody>
      {books.map(book =>
        <BookListRow key={book.id} book={book} deleteBook={deleteBook}/>
      )}
      </tbody>
    </table>
  );
};

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  deleteBook: PropTypes.func
};

export default BookList;
