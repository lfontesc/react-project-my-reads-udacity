import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

/* Custom Components */
import SearchBooks from './books/SearchBooks'
import ListBooks from './books/ListBooks'

class BooksApp extends React.Component {

  state={
    books: []
  }
 
  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
          books
      }))
    })
    
  }

  render() {
    return (
      <div className="app">
      <Route exact path='/' render={() => (
        <ListBooks books={this.state.books} />
        )} />
      <Route exact path='/search' render={() => (
        <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
