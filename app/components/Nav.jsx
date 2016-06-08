import React from 'react';

const Filter=({onSelect, activeFilter, bets=0})=>(
	<ul className="tabs">
      <li onClick={e=>onSelect(e,'Bets')} className={activeFilter == 'Bets'?'active':''}><h3>Bets</h3></li>
      <li onClick={e=>onSelect(e,'Slip')} className={activeFilter == 'Slip'?'active':''}><h3>Betslip <span className="bets-counter">{bets}</span></h3></li>      
      <li onClick={e=>onSelect(e,'Receipts')} className={activeFilter == 'Receipts'?'active':''}><h3>Receipts</h3></li>      
    </ul>
)

export default	Filter;