import axios from 'axios'
import uuidv1 from 'uuid/v1'

export const LIST_CATEGORIES='LIST_CATEGORIES'

export function listCategories(data) {
    return{
        type:LIST_CATEGORIES,
        payload:data
    }
}

export const GET_POSTS='GET_POSTS'
export function getPosts(data) {
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
    console.log(data)
    return{
        type:POST_VOTE_SUCCESS,
        payload:data
    }
}