import * as types from '../constants.js';

const slips = (state = {
    items: [],
    isPushing: false,
    receipts: []
  } , action) => {
    switch (action.type) {
    case types.ADD_BET:
      Object.assign(action.bet, {
        stake: 0
      });
      let addedItems = [...state.items, action.bet];
      return Object.assign({}, state, {
        items: addedItems
      });
    case types.CLEAR_BETSLIP:
      return Object.assign({}, state, {
        items: []
      });
    case types.UPDATE_BETSLIP:
      let newState = {};
      Object.assign(newState, state);
      newState.items.forEach(bet => {
        if (bet.bet_id == action.bet.bet_id) {
          Object.assign(bet, action.bet);
        }
      });
      return newState;
    case types.REMOVE_BET:
      let removeIndex = -1;
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].bet_id == action.bet_id) {
          removeIndex = i;
          break;
        }
      }

      //return state.slice(0, removeIndex).concat(state.slice(removeIndex+1));
      return Object.assign({}, state, {
        items: [...state.items.slice(0, removeIndex), ...state.items.slice(removeIndex + 1)]
      });

    case types.PUSHING_BETS:
      return Object.assign({}, state, {
        isPushing: action.isPushing
      });
    case types.RECEIVE_RECEIPT:
      let addedReceipts = [...state.receipts, action.receipt];
      return Object.assign({}, state, {
        receipts: addedReceipts,
        isPushing: action.isPushing
      });
    default:
      return state;
  }
}

export default slips;
