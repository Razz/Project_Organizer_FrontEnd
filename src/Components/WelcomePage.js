import React from 'react';
import LogInForm from './LogInForm';
import { tracer } from '../Middleware/Tracing';
import { ErrorHandler} from 'universal-react-logger';

class WelcomePage extends React.Component{
    state = {
      tracer,
        userNorR: null
    }

    renderWelcome = () => {
      if (this.state.userNorR === null) {
          return (
              <div>
                  <h1>Welcome to Git Organized!</h1>
                  <button className="card-button" onClick={this.returningUser}>Returning User</button>
                  <h2>or</h2>
                  <button className="card-button" onClick={this.newUser}>New User</button>
              </div>
          )
      } else {
          return <LogInForm userNorR={this.state.userNorR} setUser={this.props.setUser} back={this.backToWelcome}/>
      }
    }

    returningUser = () => {
        this.setState({userNorR: 'R'})
    }
    newUser = () => {
        this.setState({userNorR: 'N'})
    }

    backToWelcome = () => {
        this.setState({userNorR: null})
    }

    render(){
        return(
            <div id="WelcomePage">
                {this.renderWelcome()}
            </div>
        )
    }

}

export default ErrorHandler(WelcomePage, true);