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


//I wanted to clear the values on submission. But for that the component has to be a controlled input
//A controlled input must call setState it seems.
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