import {combineReducers } from 'redux';

import app from './app.js';
import bets from './bets.js';
import slips from './slips.js';




const rootReducer = combineReducers({
  slips,
  bets,
  app
})

export default rootReducer