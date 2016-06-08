import React, { Component } from 'react';
import NumSlider from './NumSlider.jsx';

const Slip = ({name, event,stake, odds, handleBetChange, bet_id, handleBetDelete, formattedOdds, placeBet}) => (
	<li className="">
		<div className="item-container">

			<span className="odds">{formattedOdds}</span><span>{name}</span>
			
			<div className="action">
				<button onClick={()=>placeBet({bet_id,odds,stake})} className="btn btn--placeBet">Place Bet</button>
			{/*
				<i onClick={(e,bet_id)=>handleBetDelete(e, bet_id)} className="fa fa-minus-circle" aria-hidden="true"></i>
				*/}
			</div>
			
			<div className="stake">
				<NumSlider 
					type="range"
					min={0} 
					max={300} 
					update={(e,bet_id)=>handleBetChange(e.target.value, bet_id)}		
					value={stake}
				/>
				{/*<input type="range" onChange={(e,bet_id)=>handleBetChange(e.target.value, bet_id)} min="0" max="500" defaultValue="0"/>*/}
			</div>
		</div>		
	</li>
)

export default Slip;