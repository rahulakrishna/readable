import {CLOSE_NAV,OPEN_NAV} from '../actions/homeActions'
const homeState={
  navOpen:false,
  anchorEl:{}
}

export function homeReducer(state={homeState},action){
  switch (action.type) {
    case OPEN_NAV:{
      return {...state,homeState:{navOpen:true,anchorEl:action.event.currentTarget}}
    }
    case CLOSE_NAV:{
      return {...state,homeState:{navOpen:false}}
    }
    default:{
        return state
    }
  }
}
