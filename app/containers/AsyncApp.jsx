import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import odds from '../odds/index.js';
import { placeBet, fetchBetsIfNeeded, addBetToSlip, changeTab,clearBetslipList, updateBetslip,removeBetslip, changeDecimalFormat,toggleMenu } from '../redux/actions';

import Bet from '../components/Bet.jsx';
import Slip from '../components/Slip.jsx';
import EmptyList from '../components/EmptySlip.jsx';
import BetHeader from '../components/BetHeader.jsx';

import Nav from '../components/Nav.jsx';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchBetsIfNeeded());
  }
  addToSlip(e, item){
  	this.props.dispatch(addBetToSlip(item));
  }
  groupBy(list, type) {
  	return _.groupBy(list, type);
  }
  sortBets(groupedBets){

  	let bets = [];
  	Object.keys(groupedBets).forEach((key,i)=> {
  		bets.push(<BetHeader key={key} event={key}></BetHeader>);

  		groupedBets[key].forEach((item, index)=>{
  			//let dec = (item.odds.numerator + item.odds.denominator)/item.odds.denominator;

  			let formattedOdds = new odds({num:item.odds.numerator, den: item.odds.denominator}).format(this.props.decimalFormat);
			bets.push(<Bet key={index+key} formattedOdds={formattedOdds} {...item} handleAdd={e=>this.addToSlip(e,item)}/>);
  		});
	});

	return bets;
  }
  changeTab(e, tabName){
  	this.props.dispatch(changeTab(tabName));
  }

  clearBetslip(e){
  	this.props.dispatch(clearBetslipList());
  }

  handleBetChange(stakeValue, bet_id){
  	stakeValue = parseInt(stakeValue);
  	// stakeValue = (stakeValue) < 0 ? 0 :  stakeValue;
  	this.props.dispatch(updateBetslip({bet_id: bet_id, stake: stakeValue}));
  }
  handleBetDelete(e, bet_id){
  	this.props.dispatch(removeBetslip(bet_id));
  }

  changeDecimalFormat(format){
  	this.props.dispatch(changeDecimalFormat(format));
  }
  toggleMenu(e){
  	let active = !this.props.showMenu;
  	this.props.dispatch(toggleMenu(active));
  }
  placeBet(item){
  	this.props.dispatch(placeBet(item));
  }
  
  render(){
  	    const { bets, betslip, currentNav, isFetching, lastUpdated, decimalFormat, showMenu, isPushing, receipts } = this.props;
  	    let groupedBets = this.groupBy(bets, 'event');

  	    let Bets = this.sortBets(groupedBets);

  	    let totalReturns = 0 ;
  	    totalReturns =betslip.reduce((total, bet)=>{
  	    	return parseFloat(total)+new odds({num:bet.odds.numerator,den:bet.odds.denominator}).calculateReturns(bet.stake);
  	    	//return parseFloat(total)+((bet.odds.numerator/bet.odds.denominator)* (bet.stake)+(bet.stake));
  	    },[0]);
  	    // slips.forEach((bet)=>{
  	    // 	totalReturns+=bet.stake;
  	    // });	

  	    let Receipts = receipts.map((item, index)=>{
  	    	let formattedOdds = new odds({num:item.odds.numerator, den: item.odds.denominator}).format(this.props.decimalFormat);
  	    	return <li key={index}><div className="item-container">
  	    		<div className="col">{item.name}</div>
  	    		<div className="col">{formattedOdds }</div>
  	    		<div className="col">{new odds({num:item.odds.numerator,den:item.odds.denominator}).calculateReturns(item.stake)}</div>
  	    		<div className="col">{item.transaction_id }</div>
				</div>
  	    	</li>
  	    });
  	    Receipts = Receipts.length == 0 ? <EmptyList title="No Receipts"/> : Receipts;

  	    //console.log('total', totalReturns);
  	    let Slips = betslip.map((item, index)=>{
  	    	let formattedOdds = new odds({num:item.odds.numerator, den: item.odds.denominator}).format(this.props.decimalFormat);
  	    	return <Slip key={index} {...item} 
  	    				formattedOdds={formattedOdds} 
  	    				handleBetDelete={e=>this.handleBetDelete(e, item.bet_id)} 
  	    				handleBetChange={stakeValue=>this.handleBetChange(stakeValue,item.bet_id)}
  	    				placeBet={(bet)=>this.placeBet(bet)}
  	    			/>;
  	    });

  	    Slips = Slips.length == 0? <EmptyList title="Empty Slip"/>: Slips;
  	    return (<div className="app">
  	    			<header><h2>Bede Casino</h2></header>
  	    			
  	    			<div className="content">
  	    			<Nav activeFilter={currentNav} bets={Slips.length} onSelect={(e,tabName)=>this.changeTab(e,tabName)}></Nav>

					<section className="settings">
						<div className={'settings-bitslip '+(Slips.length>0 && currentNav=='Slip'?'':'hide')}>
		  	    			<span onClick={e=>this.clearBetslip(e)} className="fa-button betslip-menu"><i className="fa fa-trash-o" aria-hidden="true"></i>Clear Betslip</span>
		  	    		</div>		
		  	    		<div className="settings-format">
						<span className="fa-button cog" onClick={e=>this.toggleMenu(e)}><i className="fa fa-cog" aria-hidden="true"></i>Settings</span>
						</div>
						<div className={"settings-menu "+(!showMenu?'hide':'')}>
							<button onClick={e=>this.changeDecimalFormat('American')} className="btn btn--changeFormat">American</button>
							<button onClick={e=>this.changeDecimalFormat('Fractional')} className="btn btn--changeFormat">Fractions</button>
							<button onClick={e=>this.changeDecimalFormat('Decimal')} className="btn btn--changeFormat">Decimal</button>
						</div>
					</section>

					<section className={"tabs-container "+(currentNav=='Bets'?'':'hide')}>
			  	    	<ul className="list list--bet">{Bets}</ul>
			  	    </section>

			  	    <section className={"tabs-container "+(currentNav=='Slip'?'':'hide')}>
			  	    	<ul className="list list--betslip">
			  	    		{Slips}
			  	    	
			  	    		<li className={"bet total "+ (Slips.length==0?'hide':'') }>
			  	    			<h4>Total Returns</h4>
			  	    			<h3>{totalReturns} USD</h3>
			  	    		</li>

			  	    	</ul>
			  	    	<div className={"overlay "+(isPushing?'':'hide')}>
			  	    		<div className="loading">
				  	    		<span><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span className="sr-only">Loading...</span></span>	
			  	    		</div>
			  	    	</div>

			  	    </section>
			  	    <section className={"tabs-container "+(currentNav=='Receipts'?'':'hide')}>
			  	    	<ul className="list list--receipt">
			  	    		<li>
			  	    			<div className="item-container">
			  	    				<div className="col heading">Name</div>			  	    				
			  	    				<div className="col heading">Odds</div>
			  	    				<div className="col heading">Projected Payout</div>
			  	    				<div className="col heading">Transaction ID</div>
			  	    			</div>
			  	    		</li>
			  	    	{Receipts}
			  	    	</ul>
			  	    </section>
		  	      	</div>
		  	    	<footer>
		  	    		<p>{'Last updated: '+lastUpdated} <span className="fa-button"><i className="fa fa-refresh" aria-hidden="true"></i></span></p>
		  	    	</footer>
		  	    	
  	    	</div>);
  }
 }


const mapStateToProps = (state) =>{
  return {
    bets: state.bets.items,
    isFetching: state.bets.isFetching,    
    lastUpdated: state.bets.lastUpdated,

	betslip: state.slips.items,
	receipts: state.slips.receipts,
	isPushing: state.slips.isPushing,

    decimalFormat: state.app.decimalFormat,
    showMenu: state.app.showMenu,
    currentNav: state.app.nav,

    reduxState: state
    //lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
