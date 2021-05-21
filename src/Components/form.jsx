import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';
import { Column } from '@ant-design/charts';

class Form extends Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
            boards: [],
            NewCases: 0,
            TotalCases: 0,
            TotalDeath: 0,
            casesData: [],
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        let NewCasesInt = 0;
        let CasesInt = 0;
        let DeathInt = 0;
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

        boards.map((post) => {
            if (
                post.newcases !== undefined ||
                post.totalcases !== undefined ||
                post.totaldeaths !== undefined
            ) {
                NewCasesInt = parseInt(NewCasesInt) + parseInt(post.newcases);
                CasesInt = parseInt(CasesInt) + parseInt(post.totalcases);
                DeathInt = parseInt(DeathInt) + parseInt(post.totaldeaths);
            }
        });

        const data = [
            {
                total: "Total New Cases",
                value: NewCasesInt,
                type: "cases",
            },
            {
                total: "Total Cases",
                value: CasesInt,
                type: "cases",
            },
            {
                total: "Total Deaths",
                value: DeathInt,
                type: "cases",
            }
        ];

        this.setState({
            boards,
            casesData: data,
        });
    };

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

    }


    render() {

        const { casesData } = this.state;
        var config = {
            data: casesData ,
            xField: 'total',
            yField: 'value',
            columnWidthRatio: 0.2,
            meta: {
                type: { alias: 'inner' },
        
              },
              interactions: [{ type: "element-selected" }, { type: "element-active" }],
            };

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
                <br /><br />
                <Column {...config} />
            </div>


        );
    }
}

export default Form;