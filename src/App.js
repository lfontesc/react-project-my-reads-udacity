import React from 'react'
import * as BooksAPI from './api/BooksAPI'
import './App.css'
import { Route, Switch } from 'react-router-dom'

/* Custom Components */
import SearchBooks from './books/SearchBooks'
import ListBooks from './books/ListBooks'
import NotFound from './NotFound'

class BooksApp extends React.Component {

  state={
    books: []
  }
 
  //Trazendo livros da API
  componentDidMount(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
          books
      }))
    })
    
  }

  searchBook(query) {
    BooksAPI.search(query).then((booksList) => {
        this.setState({books: booksList})
    })
}

  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(rbook => {     
      book.shelf = shelf
      this.setState((state) => ({
        books: state.books.filter((b) => (b.id !== book.id)).concat([book])
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
        <SearchBooks
          books={this.state.books} 
          onUpdateBook={(book, shelf) => { 
          this.updateBook(book, shelf) 
        }}
        onSearchBook={(query) => {
          this.searchBook(query)
        }}
        />
        )} />
      <Route component={NotFound} />
      </Switch>
      </div>
    )
  }
}

export default BooksApp
