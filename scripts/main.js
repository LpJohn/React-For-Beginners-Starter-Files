var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation; // mixin
var h = require('./helpers');

import { browserHistory } from 'react-router'

// Firebase
var Rebase = require('re-base');
var base = Rebase.createClass('https://catch-of-the-day-lpj.firebaseio.com/');

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

	// NOTE: use this to initialize with server-side info
	// also, you can get more info from react docs
	// https://facebook.github.io/react/docs/component-specs.html
	componentDidMount : function() {
		base.syncState(this.props.params.storeId + '/fishes', {
		context : this,
		state : 'fishes'
		});
	},

	addToOrder : function(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({order : this.state.order });
	},

	addFish : function(fish) {
		var timestamp = (new Date()).getTime();
		// update the state object
		this.state.fishes['fish-' + timestamp] = fish;
		// set the state
		this.setState({ fishes : this.state.fishes });
	},
	loadSamples : function() {
		this.setState({
			fishes : require('./sample-fishes')
		});
	},

	renderFish : function(key) {
		return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
	},

  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Good"/>
	  <ul className="list-of-fishes">
	 	{Object.keys(this.state.fishes).map(this.renderFish)}
	  </ul>
        </div>  
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
});

/*
	Fish
	<Fish />
*/
var Fish = React.createClass({
	onButtonClick : function() {
		var key = this.props.index;
		this.props.addToOrder(key);
	},

	render : function() {
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return (
			<li className="menu-fish">
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
			</li>
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
	renderOrder : function(key) {
		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		if (!fish) {
			return <li key={key}>Sorry, fish no longer available!</li>
		}

		return (
			<li key={key}>
				<span>{count}</span>lbs
				{fish.name}
				<span className="price">{h.formatPrice(count * fish.price)}</span>
			</li>
		)
	},
	
  render : function() {
  	var orderIds = Object.keys(this.props.order);

	var total = orderIds.reduce((prevTotal, key)=> { // es6
		var fish = this.props.fishes[key];
		var count = this.props.order[key];
		var isAvailable = fish && fish.status === 'available';

		if (fish && isAvailable) {
			return prevTotal + (count * parseInt(fish.price) || 0);
		}

		return prevTotal;
	}, 0);

    return (
	<div className="order-wrap">
		<h2 className="order-title">Your Order</h2>
		<ul className="order">
			{orderIds.map(this.renderOrder)}
			<li className="total">
				<strong>Total:</strong>
				{h.formatPrice(total)}
			</li>
		</ul>
	</div>
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
	      <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
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

