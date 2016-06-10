import 'babel-polyfill';
import expect from 'expect';

import * as types from '../app/redux/constants.js';

//import app from '../app/redux/reducer/app.js';
import app from '../app/redux/reducer/app.js';
import bets from '../app/redux/reducer/bets.js';
import slips from '../app/redux/reducer/slips.js';

//console.log(bets);
//app = app.app;
describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(
      app(undefined, {})
    ).toEqual({
      decimalFormat: 'american',
      showMenu: false,
      nav: 'Bets',
      error: {}
    });
  });
});


describe('bet reducer', () => {
  it('should handle post request', () => {
    expect(
      bets([], {
        type: types.REQUEST_POSTS,
        isFetching: true
      })
    ).toEqual({
      isFetching: true
    });
  });

  it('should handle post received', () => {
    expect(
      bets([], {
        type: types.RECEIVE_POSTS,
        isFetching: false,
        items: [{
          bet_id: 0
        }],
        lastUpdated: 123
      })
    ).toEqual({
      isFetching: false,
      items: [{
        bet_id: 0
      }],
      lastUpdated: 123
    });
  });
});


describe('slip reducer', () => {
  it('should return the initial state', () => {
    expect(
      slips(undefined, {})
    ).toEqual({
      items: [],
      isPushing: false,
      receipts: []
    });
  });
});
