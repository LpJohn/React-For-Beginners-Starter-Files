/*
  Header
  <Header/>
*/

import React from 'react';

class Header extends React.Component{
  render () {
    return (
      <header>
      	<h1>Fish Market</h1>
	<h3>{this.props.tagline}</h3>
      </header>
    )
  }
}

  Header.propTypes = {
	tagline : React.PropTypes.string.isRequired
  }

export default Header;



