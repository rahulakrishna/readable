import {
    LIST_CATEGORIES,
    GET_POSTS,
    POST_A_POST_SUCCESS,
    GET_POST_DETAIL_SUCCESS,
    GET_POST_COMMENTS_SUCCESS,
    POST_COMMENT_SUCCESS,
    POST_VOTE_SUCCESS,
    EDIT_POST_SUCCESS,
    DELETE_POST_SUCCESS,
    GET_COMMENT_DETAILS_SUCCESS,
    COMMENT_VOTE_SUCCESS,
    EDIT_COMMENT_SUCCESS,
    DELETE_COMMENT_SUCCESS
} from '../actions'
import {combineReducers} from 'redux'
import {categoryPageReducer} from './categoryPageReducer'

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
        case DELETE_POST_SUCCESS:{
            return{
                ...state,
                posts:[...state.posts.filter(post=>post.id!==action.payload)]
            }
        }
        default:{
            return state
        }
    }
}

const postDetailState={
    details:{}
}

function postDetailsReducer(state=postDetailState,action) {
    switch (action.type){
        case GET_POST_DETAIL_SUCCESS:{
            return {...state,details:action.payload}
        }
        case POST_VOTE_SUCCESS:{
            return {...state,details:action.payload}
        }
        case EDIT_POST_SUCCESS:{
            return {...state,details:action.payload}
        }
        case DELETE_POST_SUCCESS:{
            return {...state,details:{}}
        }
        default:{
            return state
        }
    }
}

const getCommentsState={
    comments:[]
}

function getCommentsReducer(state=getCommentsState,action) {
    switch (action.type){
        case GET_POST_COMMENTS_SUCCESS:{
            return {...state,comments:action.payload}
        }
        case POST_COMMENT_SUCCESS:{
            return {...state,comments:[...state.comments,action.payload]}
        }
        case EDIT_COMMENT_SUCCESS:{
            return {...state,comments:state.comments.filter(com=>com.id!==action.payload.id).concat(action.payload)}
        }
        case DELETE_COMMENT_SUCCESS:{
            return {...state,comments:state.comments.filter(com=>com.id!==action.payload)}
        }
        default:{
            return state
        }
    }
}

const commentDetailState={
    details:{}
}

const addPostState={

}

function commentDetailReducer(state=commentDetailState,action) {
    switch (action.type){
        case GET_COMMENT_DETAILS_SUCCESS:{
            return {...state,details:action.payload}
        }
        case COMMENT_VOTE_SUCCESS:{
            return {...state,details:action.payload}
        }
        case EDIT_COMMENT_SUCCESS:{
            return {...state,details:action.payload}
        }
        default:{
            return state
        }
    }
}




export default combineReducers({
    categoryReducer,
    postsReducer,
    postDetailsReducer,
    getCommentsReducer,
    commentDetailReducer,
    categoryPageReducer
})