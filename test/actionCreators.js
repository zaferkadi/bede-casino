import 'babel-polyfill';
import expect from 'expect';

import * as actions from '../app/redux/actions.js';
import * as types from '../app/redux/constants.js';

import app from '../app/redux/reducer/app.js';

// console.log(actions.toggleMenu);
describe('actions', () => {

  it('should create an action to add a todo', () => {
    const active = 'Bet';

    const expectedAction ={
		type: types.TOGGLE_MENU,
		active
	};

    // const expectedAction = {
    //   type: types.ADD_TODO,
    //   active
    // }
    expect(actions.toggleMenu(active)).toEqual(expectedAction);
  })
})

//console.log(app(undefined,{}));

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(
      app(undefined, {})
    ).toEqual(
      { decimalFormat: 'american', showMenu: false, nav: 'Bets', error:{}}
    )
  })
});

describe('empty',()=>{
	it('should work', ()=>{
		expect(true).toEqual(true);
	})
})