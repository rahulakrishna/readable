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
            url:'http://localhost:5001/posts',
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
            url:`http://localhost:5001/posts/${id}`,
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
            url:`http://localhost:5001/posts/${id}/comments`,
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
            url:'http://localhost:5001/comments',
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
    console.log(data)
    return{
        type:POST_COMMENT_SUCCESS,
        payload:data
    }
}