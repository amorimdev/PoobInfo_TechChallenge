import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

class CustomerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            companyId: null,
            name: '',
            email: '',
            rewardsNumber: '',
            dob: new Date(),
            companies: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if (event['toISOString']) {
            return this.setState({dob: event.toISOString()});
        }

        if (event.value) {
            return this.setState({companyId: event});
        }

        if (event.target.id === 'name') {
            this.setState({name: event.target.value});
        }

        if (event.target.id === 'rewardsNumber') {
            this.setState({rewardsNumber: event.target.value});
        }

        if (event.target.id === 'email') {
            this.setState({email: event.target.value});
        }

        if (event.target.id === 'dob') {
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        this.submit().then(status => {
            if (!status) return alert('Failed to create record');
            this.props.history.goBack();
        })
    }

    submit = async () => {
        const { id, companyId, name, email, rewardsNumber, dob } = this.state;
        const response = await fetch('/customers' + (id ? `/${id}` : ''),
            {
                headers: { 'Content-Type': 'application/json' },
                method: id ? 'put' : 'post',
                body: JSON.stringify({
                    companyId: companyId.value,
                    name,
                    email,
                    rewardsNumber,
                    dob
                })
            }
        );
        const body = await response.json();
        return body.status;
    };

    componentDidMount() {
        if (this.state.id) {
            this.findOne()
                .then(async (customer) => {
                    const company = await this.findCompany(customer.companyId);
                    this.setState({
                        companyId: { value: company._id || null, label: company.name || '' },
                        name: customer.name,
                        email: customer.email,
                        rewardsNumber: customer.rewardsNumber,
                        dob: customer.dob,
                    })
                })
                .catch(err => console.log(err));
        }

        this.findCompanies().then(companies => this.setState({companies}))
    }

    findOne = async () => {
        const response = await fetch('/customers/' + this.state.id);
        const body = await response.json();
        if (!body.status) throw Error(body.message);
        return body.result;
    };

    findCompany = async (id) => {
        const response = await fetch('/companies/' + id);
        const body = await response.json();
        return body.result || {};
    };

    findCompanies = async () => {
        const response = await fetch('/companies');
        const body = await response.json();
        if (!body.status) throw Error(body.message);
        return body.result.map(company => {
            return { value: company._id, label: company.name};
        });
    };

    render() {
        return (
            <div>
                <h1 className='mtb-20'>
                    Customer Form
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='companyId'>
                            Company:
                        </label>
                        <Select
                            id='companyId'
                            value={this.state.companyId}
                            onChange={this.handleChange}
                            options={this.state.companies}
                        />
                        <small className='form-text text-muted'>Is required.</small>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>
                            Name:
                        </label>
                        <input id='name' className='form-control' type='text'
                               value={this.state.name} onChange={this.handleChange} />
                        <small className='form-text text-muted'>Is required.</small>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>
                            Email:
                        </label>
                        <input id='email' className='form-control' type='text'
                               value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rewardsNumber'>
                            Rewards Number:
                        </label>
                        <input id='rewardsNumber' className='form-control' type='text'
                               value={this.state.rewardsNumber} onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='dob'>
                            DOB:
                        </label>
                        <Datetime id='dob' value={new Date(this.state.dob)} onChange={this.handleChange} />
                    </div>

                    <button className='btn btn-success float-right'>
                        Save
                    </button>
                    <Link key='/customers' className='btn btn-secondary float-right mr-10' to='/customers'>
                        Back
                    </Link>
                </form>
            </div>
        );
    }
}

export default CustomerForm;
