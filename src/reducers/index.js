import {combineReducers} from 'redux';
import books from './bookReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  books,
  ajaxCallsInProgress
});

export default rootReducer;
