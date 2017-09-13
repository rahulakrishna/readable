import {CLOSE_NAV,OPEN_NAV,SORT} from '../actions/homeActions'
const homeState={
  navOpen:false,
  anchorEl:{},
    sortBy:'timestamp'
}

export function homeReducer(state={homeState},action){
  switch (action.type) {
    case OPEN_NAV:{
      return {...state,homeState:{navOpen:true,anchorEl:action.event.currentTarget}}
    }
    case CLOSE_NAV:{
      return {...state,homeState:{navOpen:false}}
    }
      case SORT:{
        return {...state,homeState:{sortBy:action.param}}
      }
    default:{
        return state
    }
  }
}
