import React, { Component } from 'react';

import {Link} from "react-router-dom";

import DataTable from 'react-data-table-component';
import {createGetRequest, createPostRequest} from '../../actions/httpRequest';

class Signup extends Component {
    constructor( props ){
        super( props );
        this.state = {
            cities: [],
            error: ""
        }

        this.getCities = this.getCities.bind(this);
    }

    columns = [
      {
        name: 'City',
        selector: 'name',
        sortable: true,
      },
      {
        name: 'State',
        selector: 'state',
      },
    ];

    getCities = async (e) => {
        this.post = this.state;

        e.preventDefault()

        createGetRequest('/api/test/cities').then((res) => {
            console.log(res)
            if(Array.isArray(res)){
                this.setState({
                    cities: res,
                    error: ""
                })
            }
            else{
                this.setState({
                    error: JSON.stringify(res),
                    cities: []
                })
            }
        })
    }

    render(){

        return (
            <div>
                <input type="button" value="Get Cities"
                    onClick={ this.getCities }>
                </input>
                <Link to="/">
                    <input type="button" value="Home"></ input>
                </Link >
                <br />
                {this.state.error}
                <DataTable
                    title="Cities"
                    columns={this.columns}
                    data={this.state.cities}
                />
            </div>
    )}
}

export default Signup;
