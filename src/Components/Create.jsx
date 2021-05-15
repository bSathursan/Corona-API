import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('boards');
    this.state = {
      email: '',
      country: '',
      newcases: '',
      totalcases:'',
      totaldeaths:'',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, country, newcases, totalcases, totaldeaths } = this.state;

    this.ref.add({
      email,
      country,
      newcases,
      totalcases,
      totaldeaths
    }).then((docRef) => {
      this.setState({
        email: '',
        country: '',
        newcases: '',
        totaldeaths:'',
        totalcases:'',
      });
      this.props.history.push("/form")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { email, country, newcases, totalcases, totaldeaths } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD DETAILS
            </h3>
          </div>
          <div class="panel-body">
           
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email" required/>
              </div>
              <div class="form-group">
                <label for="country">Country:</label>
                <input class="form-control" name="country" value={country} onChange={this.onChange} placeholder="country" required/>
              </div>
              <div class="form-group">
                <label for="newcases">New Cases:</label>
                <input type="text" class="form-control" name="newcases" value={newcases} onChange={this.onChange} required/>
              </div>
              <div class="form-group">
                <label for="totalcases">Total Cases:</label>
                <input type="text" class="form-control" name="totalcases" value={totalcases} onChange={this.onChange} required/>
              </div>
              <div class="form-group">
                <label for="totaldeaths">Total Deaths:</label>
                <input type="text" class="form-control" name="totaldeaths" value={totaldeaths} onChange={this.onChange} required/>
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;
