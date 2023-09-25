import { useRef, useState } from "react"

import { useFetchBooksQuery } from "../../connect/bookApi/bookApi"
import { getAccessToken } from "../../connect/getAccessToken"

import { AuthButtonComponent } from "../components/AuthButtonComponent"
import { AddBookButtonComponent } from "./components/AddBookButtonComponent"
import { BookItemComponent } from "./components/BookItemComponent/BookItemComponent"
import { AddFormBookComponent } from "./components/AddFormBookComponent"

import styles from "./BooksPage.module.scss"
import { ChangeFormBookComponent } from "./components/ChangeFormBookComponent"
import { Book } from "../../models/book"

export const BooksPage = () => {
    const token = getAccessToken()

    const { data, isLoading } = useFetchBooksQuery({offset: 0, size: 20})

    const [books, SetBooks] = useState([] as Book[])
    const [addingBook, SetAddingBook] = useState(false)
    const [changeBook, SetChangeBook] = useState(false)


    const buffData = useRef({changingBookId: ''})

    const addedBook = (book: Book) => {
        SetAddingBook(false)

        console.log(book)

        books.push(book)

        SetBooks(books)
    }

    const changedBook = (book: Book) => {      
        SetBooks(books.filter(b => b.id != book.id))

        books.push(book)

        SetBooks(books)
    }


    const bookChange = (id: string) => {
        buffData.current.changingBookId = id

        console.log(books.find(b => b.id === buffData.current.changingBookId))

        SetChangeBook(true)
    }

    if(!isLoading && data?.books && books.length === 0 && data?.books.length != 0) 
        SetBooks(data.books)

    return (
        <div>
            {!addingBook && !changeBook &&
                <div className={styles.bookHeader}>
                    {!token && <AuthButtonComponent/>}            
                    <div onClick={() => SetAddingBook(true)}>
                        {token && <AddBookButtonComponent />}
                    </div>
                </div>
            }
            {addingBook &&
                <div>
                    <AddFormBookComponent addingBook={(book) => addedBook(book)}/>
                </div>
            }
            {changeBook &&
                <div>
                    <ChangeFormBookComponent 
                        changedBook={(book) => changedBook(book)}
                        book={books.find(b => b.id === buffData.current.changingBookId) 
                        ?? {} as Book}/>
                </div>
            }
            <div className={styles.books}>
                {!isLoading && !addingBook && !changeBook &&
                    books.map(b => 
                        <BookItemComponent
                            deleteBook={(id) => SetBooks(books.filter(b => b.id != id))}
                            changeBook={(id) => bookChange(id)}
                            book={b} 
                            key={b.id}
                        />
                )}
            </div>
            
        </div>
    )
}