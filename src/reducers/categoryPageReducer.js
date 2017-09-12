/**
 * Created by rahul on 12/9/17.
 */
import {FIELD_CHANGED,CLEAR_VALUES,DISABLE_BUTTON,ENABLE_BUTTON} from '../actions/categoryPageActions'

const details={
        title:'',
        author:'',
        body:'',
        buttonDisabled:false
    }

export function categoryPageReducer(state={details},action) {
    switch (action.type){
        case FIELD_CHANGED:{
            return {...state,details:{...state.details,[action.parameter]:action.e.target.value}}
        }
        case CLEAR_VALUES:{
            return {...state.details,
                title:'',
                author:'',
                body:'',
                buttonDisabled:true
            }
        }
        case DISABLE_BUTTON:{
            return {...state.details,details:{buttonDisabled:true}}
        }
        case ENABLE_BUTTON:{
            return {...state.details,details:{buttonDisabled:false}}
        }
        default:{
            return state
        }
    }
}