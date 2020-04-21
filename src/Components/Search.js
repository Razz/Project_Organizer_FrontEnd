import React from 'react';
import { tracer } from '../Middleware/Tracing'

class Search extends React.Component{
    state = {
      tracer,
        searchTerm: ''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log('look for dis')
        //send search to GH
    }

    render(){
      return(
          <div id='search-page'>
              <h1>Search GitHub</h1><br></br><br></br>
              <form onSubmit={this.handleSubmit}>
                  <input name='searchTerm' value={this.state.searchTerm} onChange={this.handleChange} placeholder='Search'/>
                  <button type="submit" id="search-button">Search</button>
              </form>
          </div>
      )
    }
}

export default Search;
