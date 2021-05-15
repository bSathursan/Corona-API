import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
        key: '',
        email: '',
        country: '',
        newcases: '',
        totaldeaths:'',
        totalcases:''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          email: board.email,
          country: board.country,
          newcases: board.newcases,
          totalcases: board.totalcases,
          totaldeaths: board.totaldeaths
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { email, country, newcases, totalcases, totaldeaths } = this.state;

    const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
        email,
        country,
        newcases,
        totalcases,
        totaldeaths
    }).then((docRef) => {
      this.setState({
        key: '',
        email: '',
        country: '',
        newcases: '',
        totaldeaths:'',
        totalcases:''
      });
      this.props.history.push("/form/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT DETAILS
            </h3>
          </div>
          <div class="panel-body">
            
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="country">Country:</label>
                <input class="form-control" name="country" value={this.state.country} onChange={this.onChange} placeholder="country" />
              </div>
              <div class="form-group">
                <label for="newcases">New Cases:</label>
                <input type="text" class="form-control" name="newcases" value={this.state.newcases} onChange={this.onChange} />
              </div>
              <div class="form-group">
                <label for="totalcases">Total Cases:</label>
                <input type="text" class="form-control" name="totalcases" value={this.state.totalcases} onChange={this.onChange} />
              </div>
              <div class="form-group">
                <label for="totaldeaths">Total Deaths:</label>
                <input type="text" class="form-control" name="totaldeaths" value={this.state.totaldeaths} onChange={this.onChange} />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;