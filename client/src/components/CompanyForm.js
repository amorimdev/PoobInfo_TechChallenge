import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CompanyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {id: props.match.params.id, name: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        this.submit().then(status => {
            if (!status) return alert('Failed to create record');
            this.props.history.goBack();
        })
    }

    submit = async () => {
        const { id, name } = this.state;
        const response = await fetch('/companies' + (id ? `/${id}` : ''),
            {
                headers: { 'Content-Type': 'application/json' },
                method: id ? 'put' : 'post',
                body: JSON.stringify({ name })
            }
        );
        const body = await response.json();
        return body.status;
    };

    componentDidMount() {
        if (this.state.id) {
            this.findOne()
                .then(name => this.setState({name}))
                .catch(err => console.log(err));
        }
    }

    findOne = async () => {
        const response = await fetch('/companies/' + this.state.id);
        const body = await response.json();
        if (!body.status) throw Error(body.message);
        return body.result.name;
    };

    render() {
        return (
            <div>
                <h1 className='mtb-20'>
                    Company Form
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>
                            Name:
                        </label>
                        <input id='name' className='form-control' type='text'
                               value={this.state.name} onChange={this.handleChange} />
                        <small className='form-text text-muted'>Is required.</small>
                    </div>

                    <button className='btn btn-success float-right'>
                        Save
                    </button>
                    <Link key='/companies' className='btn btn-secondary float-right mr-10' to='/companies'>
                        Back
                    </Link>
                </form>
            </div>
        );
    }
}

export default CompanyForm;
