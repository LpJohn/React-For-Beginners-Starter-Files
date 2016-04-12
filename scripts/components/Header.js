/*
  Header
  <Header/>
*/

import React from 'react';

var Header = React.createClass({
  render : function() {
    return (
      <header>
      	<h1>Fish Market</h1>
	<h3>{this.props.tagline}</h3>
      </header>
    )
  },
  propTypes : {
	tagline : React.PropTypes.string.isRequired
  }
});

export default Header;



