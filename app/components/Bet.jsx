import React, { Component } from 'react';

const Bet = ({bet_id, name, event, odds, handleAdd, formattedOdds}) => (
  <li className="" onClick={handleAdd}>
	<div className="item-container">
	{name}
	<div className="meta">
	<span className="odds">{formattedOdds}</span>
		<span className="add fa-button">
		<i className="fa fa-plus-circle" aria-hidden="true"></i>
		</span>	</div>
		</div>
	</li>
);
export default Bet;
