import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {
                
    updateBook = (book, shelf) => {
        if (this.props.onUpdateBook)
            this.props.onUpdateBook(book, shelf);
    }

    render(){


        const bookShelves = [
            {
                id: "currentlyReading",
                name: "Currently Reading",
            },
            {
                id: "read",
                name: "Read",
            },
            {
                id: "wantToRead",
                name: "Want to Read",
            }
        ]

        const { books } = this.props
        const showingBooks = books
        return (
            <div>
            <div className="list-books">
            <div className="list-books-title">
            <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            <div>
                <div className="bookshelf">
                {bookShelves.map(shelf => (
                    <div key={shelf.id}>
                     <h2 className="bookshelf-title">{shelf.name}</h2>
                     <Book
                        books={books.filter(book => book.shelf === shelf.id)}
                        onUpdateBookList={(book, shelf) => { // Responsável por atualizar o livro
                        this.updateBook(book, shelf)
                                        }}
                                    />
                                    </div>
                ))}
            
                </div>
         
            </div>
            </div>
            <div className="open-search">
            <Link className='close-create-contact'
                    to='/search'>
                    <button>Buscar</button>
            </Link>
            </div>
        </div>
                </div>
            )
    }
}

export default ListBooks