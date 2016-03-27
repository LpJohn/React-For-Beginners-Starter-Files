var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation; // mixin
var h = require('./helpers');

import { browserHistory } from 'react-router'

/*
  App
*/

var App = React.createClass({

	getInitialState : function() {
		return {
			fishes : {},
			order : {},
		}
	},
	addFish : function(fish) {
		var timestamp = (new Date()).getTime();
		// update the state object
		this.state.fishes['fish-' + timestamp] = fish;
		// set the state
		this.setState({ fishes : this.state.fishes });
	},
  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Good"/>
        </div>  
        <Order/>
        <Inventory addFish={this.addFish}/>
      </div>
    )
  }
});

/*
  Add Fish Form
  <AddFishForm />
*/
var AddFishForm = React.createClass({
	createFish : function(event) {
		// 1. Stop the form from submitting
		event.preventDefault();

		// 2. Take the data from the form and create an object
		var fish = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value,
		}

		// 3. Add the fish to the App State
		this.props.addFish(fish);
		this.refs.fishForm.reset();

	},
  render : function() {
    return (
	<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
		<input type="text" ref="name" placeholder="Fish Name" />
		<input type="text" ref="price" placeholder="Fish Price" />
		<select ref="status">
			<option value="available">Fresh!</option>
			<option value="unavailable">Sold Out!</option>
		</select>
		<textarea type="text" ref="desc" placeholder="Desc" />
		<input type="text" ref="image" placeholder="URL to Image" />
		<button type="submit">+ Add Item</button>
	</form>
    )
  }
});

/*
  Header
  <Header/>
*/
var Header = React.createClass({
  render : function() {
    return (
      <header>
      	<h1>Header</h1>
	<h3>{this.props.tagline}</h3>
      </header>
    )
  }
});

/*
  Order
  <Order/>
*/
var Order = React.createClass({
  render : function() {
    return (
      <p>Order</p>
    )
  }
});

/*
  Inventory
  <Inventory/>
*/
var Inventory = React.createClass({
  render : function() {
    return (
      <div>
	      <h2>Inventory</h2>
	      <AddFishForm {...this.props} />
      </div>
    )
  }
});

/*
	StorePicker
	This will let us make <StorePicker
*/

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

/*
	Not Found
*/
var NotFound = React.createClass({
	render : function() {
		return <h1>Not Found</h1>
	}
});

/*
	Routes
*/

var routes = (
	<Router history={browserHistory}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
		<Route path="*" component={NotFound}/>
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));

