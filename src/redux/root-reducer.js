import { combineReducers } from 'redux';
import cart from '../components/views/Cart/duck/reducers';
import main from '../components/views/Home/duck/reducers';
import checkout from '../components/views/Checkout/duck/reducers';

export default combineReducers({
    cart,
    main,
    checkout,
});
