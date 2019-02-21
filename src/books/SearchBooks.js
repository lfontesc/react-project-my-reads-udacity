import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'

class SearchBooks extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
            if (query !== "")
                this.props.onSearchBook(query);
    
            this.setState({ query: query })
    }

    clearQuery = () => {
        // Atualiza o estado do componente e atualiza a IU
        this.setState({ query: '' })
    }

      updateBook = (book, shelf) => {
        this.props.onUpdateBook(book, shelf);
    }
    render(){
       
        let showBooks
        const { query } = this.state
        const { books } = this.props

        if (query) {
            const  match = new RegExp(escapeRegExp(query), 'i')
            showBooks = books.filter((book) => match.test([book.title,book.authors]))
        // Se não retorna todos os valores
        } else {
            showBooks = books
        }
       
        return (
            <div>
                <div className="search-books">
                <div className="search-books-bar">
                <Link className='close-create-contact' to='/'>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <DebounceInput
                        type="text"
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search by title or author"
                        value={query} 
                        onChange={(event) => this.updateQuery(event.target.value)} 
                    />
                    
                </div>
                </div>
                {showBooks.length == 0 && (
                    <div>
                        <span>Nenhum livro encontrado para a sua busca! </span>
                    </div>
                )}
                {showBooks.length !== books.length &&  (
                    <div>
                        <span>Mostrando {showBooks.length} de {books.length} livros </span>
                        <button onClick={this.clearQuery}> Mostrar todos</button>
                    </div>
                )}
                <div className="search-books-results">
                    <Book
                        books={showBooks}
                        onUpdateBookList={(book, shelf) => {
                        this.updateBook(book, shelf)
                        }}
                    />    
                </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks