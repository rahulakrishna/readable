import {LIST_CATEGORIES,GET_POSTS,POST_A_POST_SUCCESS,POST_A_POST} from '../actions'
import {combineReducers} from 'redux'

const categoryState= {
    categories:[

    ]
}

function categoryReducer(state=categoryState,action){
    console.log(state)
    switch(action.type){
        case LIST_CATEGORIES:{
            console.log('From the reducer',action.payload.data.categories)
            return{...state,categories:action.payload.data.categories}
        }
        default:{
            return state
        }
    }
}


const postsState={
    posts:[]
}
function postsReducer(state=postsState,action) {
    switch(action.type){
        case GET_POSTS:{
            console.log(action.payload)
            return {...state,posts:action.payload}
        }
        case POST_A_POST_SUCCESS:{
            console.log('Already we have:',state.posts,'Now we got:',action.payload)
            return {
                ...state,
                status:'Success',
                posts:[...state.posts,action.payload]
            }
        }
        default:{
            return state
        }
    }
}

export default combineReducers({
    categoryReducer,
    postsReducer
})