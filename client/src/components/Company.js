import React, {Component} from 'react';
import ReactTable from 'react-table'
import * as Moment from 'moment'
import {Link} from 'react-router-dom';

export class Company extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                    id: 'name',
                    Header: 'Name',
                    accessor: 'name'
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
                                  key={'/companies/' + row.original._id} to={'/companies/' + row.original._id}>
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
        const response = await fetch('/companies');
        const body = await response.json();
        if (!body.status) throw Error(body.message);
        return body.result;
    };

    componentDidMount() {
        this.updateTableRows()
    }

    updateTableRows() {
        this.findAll()
            .then(rows => this.setState({rows}))
            .catch(err => console.log(err));
    }

    deleteAction(row) {
        this.delete(row.original._id).then(status => {
            if (!status) return alert('Failed to delete record');
            this.updateTableRows()
        })
    }

    delete = async (id) => {
        const response = await fetch(`/companies/${id}`, {method: 'delete'});
        const body = await response.json();
        return body.status;
    };

    render() {
        const {columns, rows} = this.state;
        return (
            <div>
                <h1 className='mtb-20'>
                    Company

                    <Link key='/companies/create' className='btn btn-primary float-right' to='/companies/create'>
                        New
                    </Link>
                </h1>
                <ReactTable
                    data={rows}
                    columns={columns}
                    defaultSorted={[{id: 'name'}]}
                    defaultPageSize={10}
                />
            </div>
        )
    }
}

export default Company;
