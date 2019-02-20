import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../api/BooksAPI'
import {DebounceInput} from 'react-debounce-input';

class SearchBooks extends Component {

    state = {
        findBooks: [],
        query: ''
        }


    handleSearch(e) {
        if (e.target.value !== "") {
          this.setState({ query: e.target.value });
          BooksAPI.search(this.state.query).then(findBooks => {
            this.setState({ findBooks: !findBooks || findBooks.error ? [] : findBooks });
          });
        } else {
          this.setState({ findBooks: [] });
        }
      }

    render(){
       
        const { query } = this.state
        const { books } = this.props
        const a = BooksAPI.search(query).then()
        console.log(a)
       
        return (
            <div>
                <div className="search-books">
                <div className="search-books-bar">
                <Link className='close-create-contact'
                    to='/'>
                    <button className="close-search">Close</button>
                </Link>
                    <div className="search-books-input-wrapper">
                    <DebounceInput
                        type="text"
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search by title or author"
                        onChange={this.handleSearch.bind(this)} 
                    />
                    
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.findBooks.map(book => (
                          <div className="book">
                          <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                              <div className="book-shelf-changer">
                           
                              <select>
                                  <option value="move" disabled>Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                              </select>
                              </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{[book.authors]}</div>
                      </div>

                    ))}
                    </ol>
                  
                    
                </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks