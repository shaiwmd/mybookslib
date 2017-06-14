import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const BookListRow = ({book, deleteBook}) => {
  return (
    <tr>
      <td><img src={book.watchHref} /></td>
      <td><Link className="book-title" to={'book/' + book.id}>{book.title}</Link></td>
      <td>{book.author}</td>
      <td>{book.date}</td>
      <td><div className="delete-icon" onClick={() => {deleteBook(book);}}>x</div></td>
    </tr>
  );
};

BookListRow.propTypes = {
  book: PropTypes.object.isRequired,
  deleteBook: PropTypes.func
};

export default BookListRow;
