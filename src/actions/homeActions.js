export const OPEN_NAV='OPEN_NAV'

export function openNav(e){
  return{
    type:OPEN_NAV,
    event:e
  }
}

export const CLOSE_NAV='CLOSE_NAV'

export function closeNav(){
  return{
    type:CLOSE_NAV
  }
}
