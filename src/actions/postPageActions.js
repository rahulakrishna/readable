/**
 * Created by rahul on 12/9/17.
 */

export const FIELD_CHANGED='FIELD_CHANGED'

export function updateField(e,parameter) {
    return{
        type:FIELD_CHANGED,
        e,
        parameter,
    }
}

export const DISABLE_BUTTON='DISABLE_BUTTON'
export const ENABLE_BUTTON='ENABLE_BUTTON'
export function disableButton() {
    return{
        type:DISABLE_BUTTON
    }
}
export function enableButton() {
    return{
        type:ENABLE_BUTTON
    }
}


export const SHOW_EDIT_DIALOG='SHOW_EDIT_DIALOG'
export const HIDE_EDIT_DIALOG='HIDE_EDIT_DIALOG'
export function showEditDialog() {
    return{
        type:SHOW_EDIT_DIALOG
    }
}
export function hideEditDialog() {
    return{
        type:HIDE_EDIT_DIALOG
    }
}
export const UPDATE_EDIT_DIALOG='UPDATE_EDIT_DIALOG'
export function updateEditDialog(newBody,newTitle) {
    return{
        type:UPDATE_EDIT_DIALOG,
        newBody,
        newTitle
    }
}

export const SHOW_DELETE_DIALOG='SHOW_DELETE_DIALOG'
export const HIDE_DELETE_DIALOG='HIDE_DELETE_DIALOG'
export function showDeleteDialog() {
    return{
        type:SHOW_DELETE_DIALOG
    }
}
export function hideDeleteDialog() {
    return{
        type:HIDE_DELETE_DIALOG
    }
}

export const SHOW_COMMENT_DIALOG='SHOW_COMMENT_DIALOG'
export const HIDE_COMMENT_DIALOG='HIDE_COMMENT_DIALOG'
export function showCommentDialog() {
    return{
        type:SHOW_COMMENT_DIALOG
    }
}
export function hideCommentDialog() {
    return{
        type:HIDE_COMMENT_DIALOG
    }
}