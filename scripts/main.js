var React = require('react');
var ReactDOM = require('react-dom');

/*
  App
*/

var App = React.createClass({

  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Good"/>
        </div>  
        <Order/>
        <Inventory/>
      </div>
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
      <p>Inventory</p>
    )
  }
});

/*
	StorePicker
	This will let us make <StorePicker
*/

var StorePicker = React.createClass({

	render : function() {
		var name = "John";
		return (
			<form className="store-selector">
				<h2>Please enter a store</h2>
				{/* this is a comment - where does it show up? */}
				<input type="text" ref="storeId" required />
				<input type="Submit" />
			</form>
		)
	}
});

ReactDOM.render(<App/>, document.querySelector('#main'));

