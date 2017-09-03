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
    console.log('Post Success data: ',data)
    return{
        type:POST_A_POST_SUCCESS,
        payload:data.data
    }
}