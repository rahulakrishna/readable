/**
 * Created by rahul on 13/9/17.
 */
import {GET_CATEGORY_POSTS,ADD_POST_TO_CATEGORY} from '../actions/categoryPageActions'
const posts=[]
export function categoryPostReducer(state={posts},action) {
    switch (action.type){
        case GET_CATEGORY_POSTS:{
            return {...state,posts:action.posts}
        }
        case ADD_POST_TO_CATEGORY:{
            console.log(state.posts,'PostReducer')
            //return {...state,details:{...state.details,posts:[...state.details.posts,action.payload]}}
            return {...state,posts:[...state.posts,action.payload]}
        }
        default:{
            return state
        }
    }
}