import * as types from './constants.js';
import fetch from 'isomorphic-fetch';


const requestBets = () => {
  return {
    type: types.REQUEST_POSTS,
  }
}

const receiveBets = (json) => {
  return {
    type: types.RECEIVE_POSTS,
    items: json.map(child => child),
    lastUpdated: new Date().toString()
  }
}

const fetchPosts = () => {
  return dispatch => {
    dispatch(requestBets());
    return fetch('https://bedefetechtest.herokuapp.com/v1/markets')
      .then(response => response.json())
      .then(json => dispatch(receiveBets(json)))
  }
}


export function fetchBetsIfNeeded() {
  return (dispatch, getState) => {
    //if (shouldFetchPosts(getState(),)) {
    return dispatch(fetchPosts())
  //}
  }
}
const promptError = (error) => {
  return {
    type: types.PROMPT_ERROR,
    error
  }
}
const receiveReceipt = (json, isPushing) => {
  return {
    type: types.RECEIVE_RECEIPT,
    receipt: json,
    isPushing
  }
}
const pushBets = (isPushing) => {
  return {
    type: types.PUSHING_BETS,
    isPushing
  }
}

const submitBet = (bet) => {
  //console.log('getstate',state);
  return dispatch => {
    dispatch(pushBets(true));
    return fetch('https://bedefetechtest.herokuapp.com/v1/bets', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bet),
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        if (json.statusCode) {
          //sth went south!
          dispatch(promptError(json));
          dispatch(pushBets(false));
        } else {
          dispatch(receiveReceipt(json, false));
          dispatch(removeBetslip(bet.bet_id));
        }

      });
  }
}
const shouldPushBets = (state) => {
  const haveSlips = state.slips.items.length == 0 ? false : true;
  const isPushing = state.slips.isPushing;
  if (haveSlips && !isPushing) {
    return true;
  } else {
    return false;
  }

}
export function placeBet(bet) {
  return (dispatch, getState) => {
    if (shouldPushBets(getState())) {
      return dispatch(submitBet(bet));
    }
  }
}

export function changeDecimalFormat(format) {
  return {
    type: types.CHANGE_DEC_FORMAT,
    format
  }
}
export function addBetToSlip(bet) {
  return {
    type: types.ADD_BET,
    bet
  }
}

export function changeTab(filter) {
  return {
    type: types.FILTER_BY,
    filter
  }
}

export function clearBetslipList() {
  return {
    type: types.CLEAR_BETSLIP
  }
}

export function updateBetslip(bet) {
  return {
    type: types.UPDATE_BETSLIP,
    bet
  }
}
export function removeBetslip(bet_id) {
  return {
    type: types.REMOVE_BET,
    bet_id
  }
}

export function toggleMenu(active) {
  return {
    type: types.TOGGLE_MENU,
    active
  }
}
