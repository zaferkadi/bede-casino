import  * as types from '../constants.js';

const  bets =(state = { isFetching: false,items: [],lastUpdated: 'Loading' }, action)=>{
  switch (action.type) {
    case types.REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true        
      })
    case types.RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
        lastUpdated: action.lastUpdated
      })
    default:
      return state
  }
}


export default bets;