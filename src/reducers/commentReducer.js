/**
 * Created by rahul on 13/9/17.
 */
import {
    SHOW_COMMENT_EDIT_DIALOG,
    HIDE_COMMENT_EDIT_DIALOG,
    UPDATE_COMMENT_FIELD
} from '../actions/commentActions'

const commentState={
    editComment:'',
    showEditDialog:false
}

export function commentReducer(state={commentState},action) {
    switch (action.type){
        case SHOW_COMMENT_EDIT_DIALOG:{
            return {...state,commentState:{...state.commentState,showEditDialog:true}}
        }
        case HIDE_COMMENT_EDIT_DIALOG:{
            return {...state,commentState:{...state.commentState,showEditDialog:false}}
        }
        case UPDATE_COMMENT_FIELD:{
            return {...state,commentState:{...state.commentState,editComment:action.comment}}
        }
        default:{
            return state
        }
    }
}