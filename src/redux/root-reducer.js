import { combineReducers } from 'redux';
import cart from '../components/views/Cart/duck/reducers';
import user from '../components/views/HomePage/duck/reducers';

export default combineReducers({
    cart,
    user,
});
