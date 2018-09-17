import React, {Component} from 'react';
import ReactTable from 'react-table'
import * as Moment from 'moment'
import {Link} from 'react-router-dom';

export class Customer extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    id: 'company',
                    Header: 'Company',
                    accessor: 'company',
                },
                {
                    id: 'name',
                    Header: 'Name',
                    accessor: 'name'
                },
                {
                    id: 'email',
                    Header: 'Email',
                    accessor: 'email',
                },
                {
                    id: 'rewardsNumber',
                    Header: 'Rewards Number',
                    accessor: 'rewardsNumber',
                },
                {
                    id: 'dob',
                    Header: 'DOB',
                    accessor: d => {
                        return Moment(d.dob)
                            .local()
                            .format('YYYY-MM-DD HH:mm:ss')
                    },
                    className: 'text-center'
                },
                {
                    id: 'createdAt',
                    Header: 'Created At',
                    accessor: d => {
                        return Moment(d.createdAt)
                            .local()
                            .format('YYYY-MM-DD HH:mm:ss')
                    },
                    className: 'text-center'
                },
                {
                    Header: 'Actions',
                    Cell: row => (
                        <span>
                            <Link className='btn btn-sm btn-success mr-10'
                                  key={'/customers/' + row.original._id} to={'/customers/' + row.original._id}>
                                <i className="material-icons">edit</i>
                            </Link>
                            <button className='btn btn-sm btn-danger'
                                    onClick={() => this.deleteAction(row)}>
                                <i className="material-icons">delete</i>
                            </button>
                        </span>
                    ),
                    className: 'text-center'
                }
            ],
            rows: []
        };
    }

    findAll = async () => {
        const response = await fetch('/customers');
        const body = await response.json();
        if (!body.status) throw Error(body.message);
        return await Promise.all(body.result.map(async (customer) => {
            const company = await this.findCompany(customer.companyId);
            customer.company = company.name || '';
            return customer;
        }));
    };

    deleteAction(row) {
        this.delete(row.original._id).then(status => {
            if (!status) return alert('Failed to delete record');
            this.updateTableRows()
        })
    }

    delete = async (id) => {
        const response = await fetch(`/customers/${id}`, {method: 'delete'});
        const body = await response.json();
        return body.status;
    };

    findCompany = async (id) => {
        const response = await fetch('/companies/' + id);
        const body = await response.json();
        return body.result || {};
    };

    componentDidMount() {
        this.updateTableRows()
    }

    updateTableRows() {
        this.findAll()
            .then(rows => this.setState({rows}))
            .catch(err => console.log(err));
    }

    render() {
        const {columns, rows} = this.state;
        return (
            <div>
                <h1 className='mtb-20'>
                    Customer

                    <Link key='/customers/create' className='btn btn-primary float-right' to='/customers/create'>
                        New
                    </Link>
                </h1>
                <ReactTable
                    data={rows}
                    columns={columns}
                    defaultSorted={[{id: 'company'}, {id: 'name'}]}
                    defaultPageSize={10}
                />
            </div>
        )
    }
}

export default Customer;
