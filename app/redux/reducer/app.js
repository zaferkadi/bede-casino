import  * as types from '../constants.js';

const app = (state ={ decimalFormat: 'american', showMenu: false, nav: 'Bets', error:{}}, action) =>{
	switch(action.type) {
		case types.CHANGE_DEC_FORMAT:
			return Object.assign({}, state, {decimalFormat: action.format});
		case types.TOGGLE_MENU:
			return Object.assign({}, state, {showMenu: action.active});
		case types.FILTER_BY:
			return Object.assign({}, state, {nav: action.filter});
		case types.PROMPT_ERROR:
			return Object.assign({}, state, {error: action.error})
		default:
			return state;
	}
}

export default app;