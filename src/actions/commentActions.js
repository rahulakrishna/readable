/**
 * Created by rahul on 13/9/17.
 */

export const SHOW_COMMENT_EDIT_DIALOG='SHOW_COMMENT_EDIT_DIALOG'
export function showEditDialog() {
    return{
        type:SHOW_COMMENT_EDIT_DIALOG
    }
}

export const HIDE_COMMENT_EDIT_DIALOG='HIDE_COMMENT_EDIT_DIALOG'
export function hideEditDialog() {
    return{
        type:HIDE_COMMENT_EDIT_DIALOG
    }
}

export const UPDATE_COMMENT_FIELD='UPDATE_COMMENT_FIELD'
export function updateCommentField(comment) {
    return{
        type:UPDATE_COMMENT_FIELD,
        comment
    }
}