import { CART_ORDER } from "../actions/actionType";

const INITIAL_STATE = {
    cart:null,
}


const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CART_ORDER:
            return{
                ...state,
                cart: action.cart,
            };

            default:
                return state;
    }
}

export default cartReducer;