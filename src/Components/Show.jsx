import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('boards').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/form")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          
            <h3 class="panel-title">
              {this.state.board.country}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Email:</dt>
              <dd>{this.state.board.email}</dd>
              <dt>New Cases:</dt>
              <dd>{this.state.board.newcases}</dd>
              <dt>Total Cases:</dt>
              <dd>{this.state.board.totalcases}</dd>
              <dt>Total Deaths:</dt>
              <dd>{this.state.board.totaldeaths}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
