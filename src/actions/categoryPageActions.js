/**
 * Created by rahul on 12/9/17.
 */
import axios from 'axios'
export const FIELD_CHANGED='FIELD_CHANGED'

export function updateField(e,parameter) {
    return{
        type:FIELD_CHANGED,
        e,
        parameter,
    }
}


export const CLEAR_VALUES='CLEAR_VALUES'
export function clearValues() {
    return{
        type:CLEAR_VALUES
    }
}

export const DISABLE_BUTTON='DISABLE_BUTTON'
export function disableButton() {
    return{
        type:DISABLE_BUTTON
    }
}

export const ENABLE_BUTTON='ENABLE_BUTTON'
export function enableButton() {
    return{
        type:ENABLE_BUTTON
    }
}

export const GET_CATEGORY_POSTS='GET_CATEGORY_POSTS'
export function getCategoryPosts(category) {
    return function (dispatch) {
        axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_URL}/${category}/posts`,
            headers:{
                'Authorization':'Do I love cats?'
            }
        }).then((data)=>{
            console.log(data)
            dispatch(getCategoryPostsSucces(data.data))
        })
    }
}
export function getCategoryPostsSucces(posts) {
    console.log(posts)
    return{
        type:GET_CATEGORY_POSTS,
        posts
    }
}

export const ADD_POST_TO_CATEGORY='ADD_POST_TO_CATEGORY'
export function addPostToCategory(data) {
    console.log(data)
    return{
        type:ADD_POST_TO_CATEGORY,
        payload:data
    }
}