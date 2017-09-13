/**
 * Created by rahul on 12/9/17.
 */
import {FIELD_CHANGED,CLEAR_VALUES,DISABLE_BUTTON,ENABLE_BUTTON} from '../actions/categoryPageActions'

const details={
        title:'',
        author:'',
        body:'',
        buttonDisabled:false,
        posts:[]
    }

export function categoryPageReducer(state={details},action) {
    console.log('Category Reducer',state.details)
    switch (action.type){
        case FIELD_CHANGED:{
            return {...state,details:{...state.details,[action.parameter]:action.e.target.value,posts:state.details.posts}}
        }
        case DISABLE_BUTTON:{
            console.log('While Disabling',state.details.posts)
            return {...state,details:{...state.details,buttonDisabled:true,posts:[]}}
        }
        case ENABLE_BUTTON:{
            return {...state,details:{...state.details,buttonDisabled:false,posts:[]}}
        }
        default:{
            return state
        }
    }
}
