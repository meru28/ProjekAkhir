import { combineReducers } from 'redux';
import authReducer from './authReducer';
import SelectPopokReducer from './SelectPopokReducer';

export default combineReducers({
    pikachu: () => 'Ryan Reynolds',
    auth: authReducer,
    selectedPopok: SelectPopokReducer
});

