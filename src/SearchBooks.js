import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

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
                    <input type="text" placeholder="Search by title or author"
                        onChange={this.handleSearch.bind(this)}
                    />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.findBooks.map(book => (
                             <li className="book-cover" 
                             style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")`
                             }}></li>

                    ))}
                    </ol>
                  
                    
                </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks