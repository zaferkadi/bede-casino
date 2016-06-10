import 'babel-polyfill';
import expect from 'expect';

import * as actions from '../app/redux/actions.js';
import * as types from '../app/redux/constants.js';

describe('actions', () => {
  it('should create an action to toggle menu', () => {
    const active = 'Bet';
    const expectedAction = {
      type: types.TOGGLE_MENU,
      active
    };
    expect(actions.toggleMenu(active)).toEqual(expectedAction);
  });
});
