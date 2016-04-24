/*
  Inventory
  <Inventory/>
*/

import React from 'react';

import autobind from 'autobind-decorator';

import AddFishForm from './AddFishForm';

import Firebase from 'firebase';
const ref = new Firebase('https://catch-of-the-day-lpj.firebaseio.com/');

@autobind
class Inventory extends React.Component{

	constructor() {
		super();

		this.state = {
			uid: ''
		}
	}

	authenticate(provider) {
		console.log("Trying to auth with " + provider);
		ref.authWithOAuthPopup(provider, this.authHandler);
	}

	componentWillMount() {
		console.log("Checking to see if we can log them in");
		var token = localStorage.getItem('token');
		if (token) {
			ref.authWithCustomToken(token, this.authHandler);
		}
	}

	logout() {
		ref.unauth();
		localStorage.removeItem('token');
		this.setState({
			uid : null
		});
	}

	authHandler(err, authData) {
		if(err) {
			console.error(err);
			return;
		}


		// save the login token in the browser
		localStorage.setItem('token', authData.token);

		console.log(this.props.params.storeId);
		const storeRef = ref.child(this.props.params.storeId);
		storeRef.on('value', (snapshot) => {
			var data = snapshot.val()
			});

		if(!authData.owner) {
			// claim it as our own
			storeRef.set({
				owner : authData.uid
			});
		}

		// update our state to reflect the current store owner and user
		this.setState({
			uid : authData.uid,
			owner : authData.owner || authData.uid
			});
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2>Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<p>put email and password here</p>
				<button onClick={this.authenticate.bind(this, 'github')} >Fake Login</button>
			</nav>
		)

	}

	renderInventory(key) {
		var linkState = this.props.linkState;
		return (
			<div className="fish-edit" key={key}>
				<input type="text" valueLink={linkState('fishes.' + key + '.name')} />
				<input type="text" valueLink={linkState('fishes.' + key + '.price')} />
				<select valueLink={linkState('fishes.' + key + '.status')} >
					<option value="unavailable">Sold Out!</option>
					<option value="available">Fresh!</option>
				</select>
				<textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
				<input type="text" valueLink={linkState('fishes.' + key + '.image')} />
				<button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
			</div>
		)
	}

  render() {

  	let logoutButton = <button onClick={this.logout}>Log Out!</button>

  	// first check if they aren't logged in
  	if (!this.state.uid) {
		return (
			<div>{this.renderLogin()}</div>
		       )
	}

	// then check if they aren't the owner of the current store
	if(this.state.uid !== this.state.owner) {
		return (
			<div>
				<p>Sorry, you aren't the owner of this store</p>
				{logoutButton}
			</div>
		       )
	}

    return (
      <div>
	      <h2>Inventory</h2>
	      {logoutButton}
	      {Object.keys(this.props.fishes).map(this.renderInventory)}

	      <AddFishForm {...this.props} />
	      <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
};

  Inventory.propTypes = {
	addFish : React.PropTypes.func.isRequired,
	removeFish : React.PropTypes.func.isRequired,
	fishes : React.PropTypes.object.isRequired,
	loadSamples : React.PropTypes.func.isRequired,
	linkState : React.PropTypes.func.isRequired,
  }

export default Inventory;

