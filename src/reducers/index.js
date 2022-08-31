import {combineReducers} from "redux";
import userReducer from './userReducer';
import postsReducer from "./postsReducer";
import cartReducer from "./cartReducer";



const rootReducer = combineReducers({
    userState: userReducer,
    postState: postsReducer,
    cartState: cartReducer,
});

export default rootReducer;