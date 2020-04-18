import React from 'react';
import { tracer } from '../Middleware/Tracing';

const USER_URL = '/users'

class LogInForm extends React.Component {
    state = {
      tracer,
        username: '',
        password: '',
        name: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
      this.state.tracer.local('login_form_handleSubmit', () => {
        e.preventDefault()
        switch (this.props.userNorR) {
            case 'R':
                fetch(USER_URL)
                .then(resp => resp.json())
                .then(users => {
                    const user = users.filter(user => user.username === this.state.username)[0]
                    this.props.setUser(user)
                })
                break
            case 'N':
                console.log(this.state.username, this.state.name)
                fetch(USER_URL,{
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        accept: 'application/json'
                    },
                    body: JSON.stringify({username: this.state.username, password: this.state.password, name: this.state.name})
                })
                .then(resp => resp.json())
                .then(user => this.props.setUser(user))
        }
      });
    }

    render(){
        return(
            <div>
                <h1>Welcome to Git Organized!</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.props.userNorR === 'N' && <div>Name: <input name='name' value={this.state.name} onChange={this.handleChange} placeholder='name'/><br></br></div>}
                    Username: <input name='username' value={this.state.username} onChange={this.handleChange} placeholder='username'/><br></br>
                    Password: <input name='password' type='password' value={this.state.password} onChange={this.handleChange} placeholder='password'/><br></br>
                    <button className='card-button' type="submit">Submit</button>
                </form><br></br><br></br>
                <button className='card-button' onClick={this.props.back}>Back</button>
            </div>
        )
    }
}

export default LogInForm
