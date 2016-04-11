/*
	StorePicker
	This will let us make <StorePicker
*/

import React from 'react';
import {Navigation} from 'react-router';
import { browserHistory } from 'react-router'
import h from '../helpers';

var StorePicker = React.createClass({
	goToStore : function(event) {
		event.preventDefault();
		// get the data from the input
		var storeId = this.refs.storeId.value;
		browserHistory.push('/store/' + storeId);
	},

	render : function() {
		var name = "John";
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please enter a store</h2>
				{/* this is a comment - where does it show up? */}
				<input type="text" ref="storeId" defaultValue={h.getFunName()} required />
				<input type="Submit" />
			</form>
		)
	}
});

export default StorePicker;


