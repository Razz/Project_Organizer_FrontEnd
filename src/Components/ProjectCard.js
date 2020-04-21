import React from 'react';
import ToDoForm from './ToDoForm'
import { ErrorHandler} from 'universal-react-logger';

const TO_DO_URL = "http://localhost:3001/to_dos"

class ProjectCard extends React.Component{
  state = {
    showingFront: true,
    showingToDoForm: false,
    showingNoteForm: false,
    toDos: []
  }

  componentDidMount(){
    fetch(TO_DO_URL)
    .then(resp => resp.json())
    .then(toDos => {
      const project_toDos = toDos.filter(toDo => toDo.project_card_id === this.props.project.id)
      if (project_toDos){
        this.setState({
            toDos: project_toDos
        })
      }
    })
  }
  
  toggleShowingFront = () => {
    this.setState(prevState => ({showingFront: !prevState.showingFront}))
  }

  showFront = () => {
    return (
      <div>
        <h2>{this.props.project.name}</h2>
        <img src={this.props.project.logo}></img>
        <p>{this.props.project.description}</p>
        <p>Status: {this.props.project.status}</p>
        <p>Repository Link: <a href={this.props.project.repo_link}>{this.props.project.repo_link}</a></p>
        <button className='card-button' onClick={this.toggleShowingFront}>Show Back</button>
      </div>
    )
  }

  showBack = () => {
    console.log(this.state.toDos)
    return (
      <div>
        <h2>{this.props.project.name}</h2><button className='card-button' onClick={this.props.toggleEditForm}>Edit Project</button>
        <h3>Tasks: {this.state.toDos && this.state.toDos.map(toDo => <li key={toDo.id} className='li'>{toDo.description}
        <button className='card-button' id={toDo.id} onClick={this.deleteToDo}>Delete</button></li>)}</h3>
        {this.state.showingToDoForm ?
        <ToDoForm url={TO_DO_URL} project_id={this.props.project.id} addToDo={this.addToDo} toggleForm={this.toggleToDoForm}/>
        : <button className='card-button' onClick={this.toggleToDoForm}>Add Task</button>}
        <br></br><br></br>
        {/* {this.props.project.notes ?
        <div>Notes: {this.props.project.notes}<button className='card-button' onClick={this.toggleNoteForm}>Edit Notes</button></div>
        : <button className='card-button' onClick={this.toggleNoteForm}>Add Notes</button>}
        <br></br><br></br> */}
        <button className='card-button' onClick={this.toggleShowingFront}>Show Front</button>
      </div>
    )
  }

  toggleToDoForm = () => {
    this.setState(prevState => ({showingToDoForm: !prevState.showingToDoForm}))
  }

  toggleNoteForm = () => {
    this.setState(prevState => ({showingNoteForm: !prevState.showingNoteForm}))
  }

  addToDo = (data) => {
    let updateToDos
    if (this.state.toDos){
        updateToDos = [...this.state.toDos, data]
    } else {
        updateToDos = [data]
    }
    this.setState({toDos: updateToDos})
  }

  deleteToDo = (e) => {
    fetch(`${TO_DO_URL}/${e.target.id}`,{method: 'DELETE'})
    const updateToDos = this.state.toDos.filter(toDo => toDo.id != e.target.id)
    this.setState({toDos: updateToDos})
  }

  render(){
    document.documentElement.style.setProperty('--bc', this.props.project.color)
    return (
      <div className='project-card'>
        {this.state.showingFront ? this.showFront() : this.showBack()}
      </div>
    );
  }
}


export default ErrorHandler(ProjectCard, true);
  