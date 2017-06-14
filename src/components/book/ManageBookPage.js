import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import * as bookActions from '../../actions/bookActions';
import BookForm from './BookForm';
import {validateTitle, validateAuthor, validateDate} from '../../actions/validations';

export class ManageBookPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      book: Object.assign({}, props.book),
      errors: {},
      saving: false
    };

    this.updateBookState = this.updateBookState.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.cancelBook = this.cancelBook.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.book.id != nextProps.book.id) {
      // Necessary to populate form when existing book is loaded directly.
      this.setState({book: Object.assign({}, nextProps.book)});
    }
  }

  updateBookState(event) {
    const field = event.target.name;
    let book = this.state.book;
    book[field] = event.target.value;
    return this.setState({book: book});
  }

  bookFormIsValid() {
    let formIsValid = true;
    let errors = {};
    let  { title, date, author } = this.state.book;
    if(validateTitle(title) === false) {
      errors.title = 'Title must be capitalize, contain letters only, at least 4 characters and up to 80 characters.';
      formIsValid = false;
    }
    if(validateAuthor(author) === false) {
      errors.author = 'author must not be empty, contain letters only, at least 4 characters and up to 60 characters.';
      formIsValid = false;
    }

    if(validateDate(date) === false) {
      errors.date = 'Date must be formatted as MM/DD/YYYY';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  cancelBook(event) {
    event.preventDefault();
    this.context.router.push('/books');
  }

  saveBook(event) {
    event.preventDefault();

    if (!this.bookFormIsValid()) {
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveBook(this.state.book)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Book saved');
    this.context.router.push('/books');
  }

  render() {
    return (
      <BookForm
        onChange={this.updateBookState}
        onSave={this.saveBook}
        onCancel={this.cancelBook}
        book={this.state.book}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageBookPage.propTypes = {
  book: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageBookPage.contextTypes = {
  router: PropTypes.object
};

function getBookById(books, id) {
  const book = books.filter(book => book.id == id);
  if (book) return book[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const bookId = ownProps.params.id; // from the path `/book/:id`

  let book = {id: '', watchHref: '', title: '', author: '',  date: ''};

  if (bookId && state.books.length > 0) {
    book = getBookById(state.books, bookId);
  }

  return {
    book: book
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(bookActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageBookPage);
