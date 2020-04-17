import React from 'react';
import './App.css';
import PageContainer from './Containers/PageContainer'
import Nav from './Components/Nav'
import WelcomePage from './Components/WelcomePage'
import { Tracer, ExplicitContext, BatchRecorder, jsonEncoder, Annotation } from 'zipkin';
import { HttpLogger } from 'zipkin-transport-http';
import wrapFetch from 'zipkin-instrumentation-fetch';


const { JSON_V2 } = jsonEncoder
const tracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: '/tracing',
      jsonEncoder: JSON_V2,
      fetch,
    }),
  }),
  localServiceName: 'sre-webinar-app-frontend',
});

class App extends React.Component {
  state = {
    loggedIn: false,
    tracer,
    user: {},
    view: 'projects'
  }
  
  componentDidMount(){
    const user_id = localStorage.user_id
    this.state.tracer.local('users', function() {
      if(user_id){
        fetch('/users')
          .then(resp => resp.json())
          .then(users => {
            const user = users.filter(user => user.id == user_id)[0]
            this.setState({
              loggedIn: true,
              user: user
            });
          });
      }
    });
  }

  handleNavClick = (e) => {
    let page = e.target.name
    this.state.tracer.local('nav-click', () => {
      this.setState({
        view: page
      })
    });
  }

  setUser = (user) => {
    this.state.tracer.local('set-user', () => {
      this.setState({
        loggedIn: true,
        user: user,
      });
      localStorage.user_id = user.id
    });
  }

  logOut = () => {
    this.state.tracer.local('log-out', () => {
      localStorage.removeItem('user_id')
      this.setState({
        loggedIn: false,
        user: {}
      })
    });
  }
  
  render(){
    return (
      <div className="App">
        <Nav loggedIn={this.state.loggedIn} user={this.state.user} handleNavClick={this.handleNavClick} logOut={this.logOut}/>
        {this.state.loggedIn ? <PageContainer user={this.state.user} view={this.state.view}/> : <WelcomePage setUser={this.setUser}/>}
        {/* <PageContainer user={this.state.user} view={this.state.view}/> */}
      </div>
    );
  }
}

export default App;
