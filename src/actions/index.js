import axios from 'axios'
import uuidv1 from 'uuid/v1'

import {addPostToCategory} from './categoryPageActions'

export const LIST_CATEGORIES='LIST_CATEGORIES'

export function listCategories() {
    return function (dispatch) {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/categories`,
            headers:{
                'Authorization':'Grrrrrrr!'
            }
        }).then((data)=>{
            dispatch(listCategoriesSuccess(data))
        })
    }
}
export function listCategoriesSuccess(data) {
    return{
        type:LIST_CATEGORIES,
        payload:data
    }
}

export const GET_POSTS='GET_POSTS'
export function getPosts() {
    return function (dispatch) {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts`,
            headers:{
                'Authorization':'I should be sleeping!'
            }
        }).then((data)=>{
            dispatch(getPostsSuccess(data.data))
        })
    }
}
export function getPostsSuccess(data) {
    return{
        type:GET_POSTS,
        payload:data
    }
}

export const POST_A_POST_SUCCESS='POST_A_POST_SUCCESS'
export function postAPost(title,body,author,category) {
    return function (dispatch) {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts`,
            headers:{
                'Authorization':'Okay. I finally understand redux-thunk!'
            },
            data:{
                id:uuidv1(),
                timestamp:Date.now(),
                title,
                body,
                author,
                category
            }
        }).then((data)=>{
            dispatch(postAPostSuccess(data))
            dispatch(addPostToCategory(data.data))
        })
    }
}

export function postAPostSuccess(data) {
    return{
        type:POST_A_POST_SUCCESS,
        payload:data.data
    }
}

export const GET_POST_DETAIL_SUCCESS='GET_POST_DETAIL_SUCCESS'

export function getPostDetails(id) {
    return function (dispatch) {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
            headers:{
                'Authorization':'Let\'s make a coffee!'
            }
        }).then((data)=>{
            dispatch(getPostDetailsSuccess(data.data))
        })
    }
}

export function getPostDetailsSuccess(data) {
    return{
        type:GET_POST_DETAIL_SUCCESS,
        payload:data
    }
}

export const GET_POST_COMMENTS_SUCCESS='GET_POST_COMMENTS_SUCCESS'

export function getPostComments(id) {
    return function (dispatch) {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts/${id}/comments`,
            headers:{
                'Authorization':'Sun is up in Bengaluru city!'
            }
        }).then((data)=>{
            dispatch(getPostCommentsSuccess(data.data))
        })
    }
}

export function getPostCommentsSuccess(data) {
    console.log(data)
    return{
        type:GET_POST_COMMENTS_SUCCESS,
        payload:data
    }
}

export const POST_COMMENT_SUCCESS='POST_COMMENT_SUCCESS'

export function postComment(id,body,author) {
    return function (dispatch) {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/comments`,
            data:{
                parentId:id,
                body,
                author,
                id:uuidv1(),
                timestamp:Date.now()
            },
            headers:{
                'Authorization':'Bengaluru is cool!'
            }
        }).then((data)=>{
            dispatch(postCommentSuccess(data.data))
        })
    }
}

function postCommentSuccess(data){
    return{
        type:POST_COMMENT_SUCCESS,
        payload:data
    }
}

export const POST_VOTE_SUCCESS='POST_VOTE_SUCCESS'

export function postVote(id,vote) {
    return function (dispatch) {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
            data:{
                option:vote
            },
            headers:{
                'Authorization':'Long time!'
            }
        }).then((data)=>{
            dispatch(postVoteSuccess(data.data))
        })
    }
}

export function postVoteSuccess(data){
    return{
        type:POST_VOTE_SUCCESS,
        payload:data
    }
}

export const EDIT_POST_SUCCESS='EDIT_POST_SUCCESS'

export function editPost(id,title,body) {
    return function (dispatch) {
        axios({
            method:'put',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
            data:{
                title,
                body
            },
            headers:{
                'Authorization':'I hate my Uni'
            }
        }).then((data)=>{
            dispatch(editPostSuccess(data.data))
        })
    }
}

export function editPostSuccess(data) {
    return {
        type:EDIT_POST_SUCCESS,
        payload:data
    }
}

export const DELETE_POST_SUCCESS='DELETE_POST_SUCCESS'
export function deletePost(id) {
    return function (dispatch) {
        axios({
            method:'delete',
            url:`${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
            headers:{
                'Authorization':'I am sorry I am not doing error handling :('
            }
        }).then((data)=>{
            console.log(data)
            dispatch(deletePostSuccess(id))
        }).catch((err)=>{
            console.log(err)
            dispatch(deletePostSuccess(id))
        })
    }
}

export function deletePostSuccess(id) {
    return{
        type:DELETE_POST_SUCCESS,
        payload:id
    }
}

export const GET_COMMENT_DETAILS_SUCCESS='GET_COMMENT_DETAILS_SUCCESS'
export function getCommentDetails(id) {
    return function (dispatch) {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
            headers:{
                'Authorization':'I don\'t think the backend is delering anything'
            }
        }).then((data)=>{
            dispatch(getCommentDetailsSuccess(data.data))
        })
    }
}

export function getCommentDetailsSuccess(data){
    return{
        type:GET_COMMENT_DETAILS_SUCCESS,
        payload:data
    }
}

export const COMMENT_VOTE_SUCCESS='COMMENT_VOTE_SUCCESS'
export function voteOnComment(id,vote) {
    return function (dispatch) {
        axios({
            method:'post',
            url:`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
            data:{
                option:vote
            },
            headers:{
                'Authorization':'Long time!'
            }
        }).then((data)=>{
            dispatch(voteOnCommentSuccess(data.data))
        })
    }
}
export function voteOnCommentSuccess(data) {
    return{
        type:COMMENT_VOTE_SUCCESS,
        payload:data
    }
}

export const EDIT_COMMENT_SUCCESS='EDIT_COMMENT_SUCCESS'

export function editComment(id,body) {
    return function (dispatch) {
        axios({
            method:'put',
            url:`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
            data:{
                body,
                timestamp:Date.now()
            },
            headers:{
                'Authorization':'I hate my Uni'
            }
        }).then((data)=>{
            dispatch(editCommentSuccess(data.data))
        })
    }
}

export function editCommentSuccess(data) {
    return {
        type:EDIT_COMMENT_SUCCESS,
        payload:data
    }
}

export const DELETE_COMMENT_SUCCESS='DELETE_COMMENT_SUCCESS'
export function deleteComment(id) {
    return function (dispatch) {
        axios({
            method:'delete',
            url:`${process.env.REACT_APP_BACKEND_URL}/comments/${id}`,
            headers:{
                'Authorization':'I am sorry I am not doing error handling :('
            }
        }).then((data)=>{
            console.log(data)
            dispatch(deleteCommentSuccess(id))
        }).catch((err)=>{
            console.log(err)
            dispatch(deleteCommentSuccess(id))
        })
    }
}

export function deleteCommentSuccess(id) {
    return{
        type:DELETE_COMMENT_SUCCESS,
        payload:id
    }
}