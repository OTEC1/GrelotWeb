import { GET_POSTS} from "../actions/actionType";

const INITIAL_STATE = {
    posts: [],
}


const postsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_POSTS:
            return {
                ...state,
                posts: action.posts
            };
        default:
            return state;
    }
};

export default postsReducer;