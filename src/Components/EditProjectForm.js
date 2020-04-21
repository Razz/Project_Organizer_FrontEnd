import React from 'react';
import { tracer } from '../Middleware/Tracing'

class EditProjectForm extends React.Component {
    state = {
      tracer,
        name: this.props.project.name,
        logo: this.props.project.logo,
        description: this.props.project.description,
        status: this.props.project.status,
        repoLink: this.props.project.repo_link,
        color: this.props.project.color,
        notes: this.props.project.notes
    };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleSubmit = (e) => {
      this.state.tracer.local('edit_project_handleSubmit', () => {
          e.preventDefault()
          const data = {
              name: this.state.name,
              logo: this.state.logo,
              description: this.state.description,
              status: this.state.status,
              repo_link: this.state.repoLink,
              notes: this.state.notes,
              color: this.state.color
          }
          fetch(`${this.props.url}/${this.props.project.id}`,{
              method: 'PATCH',
              headers: {
                  'content-type': 'application/json',
                  accept: 'application/json'
              },
              body: JSON.stringify(data)
          })
          .then(resp => resp.json())
          .then(
              this.props.updateProject(data),
              this.props.toggleForm()
          )
      });
    }

    deleteProject = () => {
      this.state.tracer.local('delete_project', () => {
        fetch(`${this.props.url}/${this.props.project.id}`,{method: 'DELETE'})
        .then(
            this.props.removeProject(this.props.project.id),
            this.props.toggleForm()
        )
      });
    }

    render(){
        document.documentElement.style.setProperty('--bc', this.state.color)
        return(
            <div id='EditProjectForm'>
                <h1>Edit Project</h1>
                <form onSubmit={this.handleSubmit}>
                    Name: <input name='name' value={this.state.name} onChange={this.handleChange}/><br></br><br></br>
                    Link to Logo Image: <input name='logo' value={this.state.logo} onChange={this.handleChange}/><br></br><br></br>
                    Description: <textarea name='description' value={this.state.description} onChange={this.handleChange}/><br></br><br></br>
                    Status: <select name='status' value={this.state.status} onChange={this.handleChange}>
                        <option value='In Progress'>In Progress</option>
                        <option value='Complete'>Complete</option>
                    </select><br></br><br></br>
                    Link to Repository: <input name='repoLink' value={this.state.repoLink} onChange={this.handleChange}/><br></br><br></br>
                    {/* Notes: <input name='notes' value={this.state.notes} onChange={this.handleChange}/><br></br><br></br> */}
                    Background Color for Project Card: <input name='color' value={this.state.color} onChange={this.handleChange}/><br></br><br></br>
                    <button className='card-button' type="submit">Submit</button>
                </form><br></br>
                <button className='card-button' onClick={this.deleteProject}>Delete Project</button><br></br><br></br>
                <button className='card-button' onClick={this.props.toggleForm}>Back</button>
            </div>
        )
    }
}

export default EditProjectForm
