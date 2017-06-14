import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as bookActions from '../../actions/bookActions';
import BookList from './BookList';

class BooksPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddBookPage = this.redirectToAddBookPage.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  bookRow(book, index) {
    return <div key={index}>{book.title}</div>;
  }

  redirectToAddBookPage() {
    hashHistory.push('/book');
  }

  deleteBook(book) {
    let check = confirm("Are you sure you want to delete this book?");
    if(check === true) {
      this.props.actions.deleteBook(book);
      this.deleteMessage();
    } else {
      return;
    }
  }

  deleteMessage() {
    toastr.error('Book deleted');
  }
  render() {
    const {books} = this.props;

    return (
      <div className="book-wrap">
        <h1>Books</h1>
        <input type="submit"
               value="Add New Book"
               className="btn btn-primary"
               onClick={this.redirectToAddBookPage}/>
        <BookList books={books} deleteBook={this.deleteBook}/>
      </div>
    );
  }
}

BooksPage.propTypes = {
  books: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);
