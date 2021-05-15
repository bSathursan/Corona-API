import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';


class Form extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { email, country, newcases, totalcases, totaldeaths } = doc.data();
            boards.push({
                key: doc.id,
                doc,
                email,
                country,
                newcases,
                totalcases,
                totaldeaths,
            });
        });
        this.setState({
            boards
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        
    }


    render() {
        
        return (
            
                <div class="container">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">
                                Corona Details
                            </h3>
                        </div>
                        <div class="panel-body">
                            <h4><Link to="/create">Add Details</Link></h4>
                            <table class="table table-stripe">
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Country</th>
                                        <th>New Cases</th>
                                        <th>Total Cases</th>
                                        <th>Total Deaths</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.boards.map(board =>
                                        <tr>
                                            <td><Link to={`/show/${board.key}`}>{board.email}</Link></td>
                                            <td>{board.country}</td>
                                            <td>{board.newcases}</td>
                                            <td>{board.totalcases}</td>
                                            <td>{board.totaldeaths}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                   
                </div>
               
            
        );
    }
}

export default Form;