import React from 'react';
import TextInput from '../common/TextInput';

const BookForm = ({book, onSave, onChange, onCancel, saving, errors}) => {
  return (
    <form>
      <h1>Manage Book</h1>
      <TextInput
        name="title"
        label="Title"
        value={book.title}
        onChange={onChange}
        error={errors.title}/>

      <TextInput
        name="author"
        label="Author"
        value={book.author}
        onChange={onChange}
        error={errors.author}/>

      <TextInput
        name="date"
        label="Date"
        value={book.date}
        placeholder="MM/DD/YYYY"
        onChange={onChange}
        error={errors.date}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Canceling...' : 'Cancel'}
        className="btn btn-primary"
        onClick={onCancel}/>
    </form>
  );
};

BookForm.propTypes = {
  book: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default BookForm;
