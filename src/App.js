import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import { Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'


/* Custom Components */
import SearchBooks from './books/SearchBooks'
import ListBooks from './books/ListBooks'
import NotFound from './NotFound'

class BooksApp extends React.Component {

  state={
    books: []
  }
 
  componentWillMount(){
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
      <Switch>
      <Route exact path='/' render={() => (
        <ListBooks books={this.state.books} />
        )} />
      <Route exact path='/search' render={() => (
        <SearchBooks />
        )} />
      <Route component={NotFound} />
      </Switch>
      </div>
    )
  }
}

export default BooksApp
