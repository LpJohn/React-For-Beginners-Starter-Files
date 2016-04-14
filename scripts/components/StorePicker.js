/*
	StorePicker
	This will let us make <StorePicker
*/

import React from 'react';
import {Navigation} from 'react-router';
import { browserHistory } from 'react-router'
import h from '../helpers';
// import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component {

	// mixins : [Navigation]

	goToStore(event) {
		event.preventDefault();
		// get the data from the input
		var storeId = this.refs.storeId.value;
		browserHistory.push('/store/' + storeId);
	}

	render() {
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
}

// reactMixin.onClass(StorePicker, Navigation);

export default StorePicker;


