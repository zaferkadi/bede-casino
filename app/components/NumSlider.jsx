import React from 'react';

class NumSlider extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NumSlider';
    }
    render() {
        return <div>
        	<input type={this.props.type} 
        		min={this.props.min} 
        		max={this.props.max} 
        		step={this.props.step}
				
				onChange={(e)=>this.props.update(e)}
				value={this.props.value}
        	/>
        	<label>{this.props.value} USD
        	</label>
        </div>;
    }
}

export default NumSlider;
