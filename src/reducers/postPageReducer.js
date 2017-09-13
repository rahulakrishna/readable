/**
 * Created by rahul on 12/9/17.
 */

import {
    FIELD_CHANGED,
    SHOW_EDIT_DIALOG,
    HIDE_EDIT_DIALOG,
    ENABLE_BUTTON,
    DISABLE_BUTTON,
    SHOW_DELETE_DIALOG,
    HIDE_DELETE_DIALOG,
    SHOW_COMMENT_DIALOG,
    HIDE_COMMENT_DIALOG,
    UPDATE_EDIT_DIALOG
} from '../actions/postPageActions'

const applicationState={
    author:'',
    body:'',
    buttonDisabled:false,
    showEditDialog:false,
    showDeleteDialog:false,
    showCommentDialog:false,
    newBody:'',
    newTitle:'',
    editSubmitButtonDisabled:false,

    selectedComment:{}
}

export function postPageReducer(state={applicationState},action) {
    switch (action.type){
        case FIELD_CHANGED:{
            return {...state,applicationState:{...state.applicationState,[action.parameter]:action.e.target.value}}
        }
        case DISABLE_BUTTON:{
            return {...state,applicationState:{...state.applicationState,buttonDisabled:true}}
        }
        case ENABLE_BUTTON:{
            return {...state,applicationState:{...state.applicationState,buttonDisabled:false}}
        }
        case SHOW_EDIT_DIALOG:{
            return {...state,applicationState:{...state.applicationState,showEditDialog:true}}
        }
        case HIDE_EDIT_DIALOG:{
            return {...state,applicationState:{...state.applicationState,showEditDialog:false}}
        }
        case UPDATE_EDIT_DIALOG:{
            return {...state,applicationState:{...state.applicationState,newBody:action.newBody,newTitle:action.newTitle}}
        }
        case SHOW_DELETE_DIALOG:{
            return {...state,applicationState:{...state.applicationState,showDeleteDialog:true}}
        }
        case HIDE_DELETE_DIALOG:{
            return {...state,applicationState:{...state.applicationState,showDeleteDialog:false}}
        }
        case SHOW_COMMENT_DIALOG:{
            return {...state,applicationState:{...state.applicationState,showCommentDialog:true}}
        }
        case HIDE_COMMENT_DIALOG:{
            return {...state,applicationState:{...state.applicationState,showCommentDialog:false}}
        }
        default:{
            return state
        }
    }
}