import React from 'react';
import { tracer } from '../Middleware/Tracing'

class ToDoForm extends React.Component {
    state = {
      tracer,
        scheduling: false,
        description: '',
        date: '',
        starttime: '',
        endtime: ''
    }

    toggleScheduleEntry = () => {
        this.setState(prevState => ({scheduling: !prevState.scheduling}))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
      this.state.tracer.local('todo_form_handleSubmit', () => {
        e.preventDefault()
        const data = {
            description: this.state.description,
            completed: false,
            project_card_id: this.props.project_id,
            date: this.state.date,
            starttime: this.state.starttime,
            endtime: this.state.endtime
        }
        fetch(this.props.url,{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                accept: 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resp => resp.json())
        .then(
            this.props.addToDo(data),
            this.props.toggleForm()
        )
      });
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                Task: <textarea name='description' value={this.state.description} onChange={this.handleChange}/><br></br><br></br>
                {this.state.scheduling ?
                <div>
                Date: <input name='date' value={this.state.date} onChange={this.handleChange}/><br></br>
                Starting Time: <input name='starttime' value={this.state.starttime} onChange={this.handleChange}/><br></br>
                Ending Time: <input name='endtime' value={this.state.endtime} onChange={this.handleChange}/>
                </div>
                : <button className='card-button' onClick={this.toggleScheduleEntry}>Schedule this task?</button>}<br></br><br></br>
                <button className='card-button' type="submit">Submit</button>
            </form>
        )
    }
}

export default ToDoForm
