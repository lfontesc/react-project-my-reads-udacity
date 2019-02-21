import React, { Component } from 'react'

class Book extends Component {
          
    updateBookList = (book, shelf) => {
        this.props.onUpdateBookList(book, shelf);
    }

    render(){
        
        const {books} = this.props

        return (
            <div className="bookshelf-books">
                <ol className="books-grid"> 
                    {books.map((book) => (
                        <li key={book.id}>
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
                        </li>
                    ))}
                </ol>
            </div>
            )
    }
}

export default Book